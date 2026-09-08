import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";

export const ADMIN_COOKIE_NAME = "tnt_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Server-side fallback secret if AUTH_SECRET is not explicitly provided in environment
const AUTH_SECRET = process.env.AUTH_SECRET || "tnt-car-booking-admin-secret-key-production-2026";

export interface AdminSessionPayload {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
  issuedAt: number;
  expiresAt: number;
}

// Helpers for Base64URL encoding/decoding without Node-specific buffers
function stringToBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToString(base64url: string): string {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Signs a session payload with HMAC-SHA256 using standard Web Crypto API.
 */
export async function signSessionToken(
  payload: AdminSessionPayload,
  secret = AUTH_SECRET
): Promise<string> {
  const payloadJson = JSON.stringify(payload);
  const payloadBase64 = stringToBase64Url(payloadJson);

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadBase64));
  const signatureHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${payloadBase64}.${signatureHex}`;
}

/**
 * Verifies an HMAC-SHA256 signed session token in constant time using standard Web Crypto API.
 */
export async function verifySessionToken(
  token: string,
  secret = AUTH_SECRET
): Promise<AdminSessionPayload | null> {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [payloadBase64, signatureHex] = token.split(".");
  if (!payloadBase64 || !signatureHex) {
    return null;
  }

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const matches = signatureHex.match(/.{1,2}/g);
    if (!matches) return null;

    const signatureBytes = new Uint8Array(matches.map((byte) => parseInt(byte, 16)));
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(payloadBase64)
    );

    if (!isValid) {
      return null;
    }

    const payloadJson = base64UrlToString(payloadBase64);
    const payload = JSON.parse(payloadJson) as AdminSessionPayload;

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    // Role check
    if (payload.role !== "ADMIN" && payload.role !== "AGENT") {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("Session verification error:", error);
    return null;
  }
}

/**
 * Creates and sets the encrypted/signed admin session cookie.
 */
export async function setAdminSessionCookie(user: {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}) {
  const now = Date.now();
  const payload: AdminSessionPayload = {
    userId: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    issuedAt: now,
    expiresAt: now + SESSION_DURATION_MS,
  };

  const token = await signSessionToken(payload);
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_DURATION_MS / 1000),
  });

  return payload;
}

/**
 * Retrieves and validates the current active admin session from request cookies.
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Deletes the admin session cookie on logout.
 */
export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

/**
 * Server-side authorization guard for Server Actions and Server Components.
 * Throws an error if the caller is unauthenticated or lacks admin privileges.
 */
export async function requireAdminSession(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "AGENT")) {
    throw new Error("Unauthorized: Admin or Agent privileges required.");
  }
  return session;
}
