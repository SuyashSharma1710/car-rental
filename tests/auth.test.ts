import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "../src/lib/auth/password";
import {
  signSessionToken,
  verifySessionToken,
  AdminSessionPayload,
} from "../src/lib/auth/session";
import { AdminLoginSchema } from "../src/lib/validations/auth";
import { UserRole } from "@prisma/client";
import { createVehicleAction, updateVehicleAction, toggleVehicleStatusAction, createCategoryAction } from "../src/lib/actions/adminActions";

test("Auth Security - Password Hashing produces unique salted hash", () => {
  const plainPassword = "SuperSecureAdminPassword2026!";
  const hash1 = hashPassword(plainPassword);
  const hash2 = hashPassword(plainPassword);

  // Different salts mean different outputs
  assert.notEqual(hash1, hash2);
  assert.ok(hash1.includes(":"));
  assert.ok(hash2.includes(":"));

  // Both verify successfully against the password
  assert.equal(verifyPassword(plainPassword, hash1), true);
  assert.equal(verifyPassword(plainPassword, hash2), true);
});

test("Auth Security - Password Verification rejects incorrect password", () => {
  const plainPassword = "SuperSecureAdminPassword2026!";
  const hash = hashPassword(plainPassword);

  assert.equal(verifyPassword("WrongPassword123!", hash), false);
  assert.equal(verifyPassword("", hash), false);
  assert.equal(verifyPassword(plainPassword, "invalid_hash_string"), false);
});

test("Auth Security - Session Signing creates valid HMAC verifiable token", async () => {
  const now = Date.now();
  const payload: AdminSessionPayload = {
    userId: "usr_admin_123",
    email: "admin@tntrentals.com",
    fullName: "Lead Admin",
    role: "ADMIN",
    issuedAt: now,
    expiresAt: now + 60 * 60 * 1000,
  };

  const token = await signSessionToken(payload);
  assert.ok(token.includes("."));

  const verified = await verifySessionToken(token);
  assert.notEqual(verified, null);
  if (verified) {
    assert.equal(verified.userId, "usr_admin_123");
    assert.equal(verified.email, "admin@tntrentals.com");
    assert.equal(verified.role, "ADMIN");
  }
});

test("Auth Security - Session Verification rejects tampered token or signature", async () => {
  const now = Date.now();
  const payload: AdminSessionPayload = {
    userId: "usr_admin_123",
    email: "admin@tntrentals.com",
    fullName: "Lead Admin",
    role: "ADMIN",
    issuedAt: now,
    expiresAt: now + 60 * 60 * 1000,
  };

  const token = await signSessionToken(payload);
  const [dataPart, sigPart] = token.split(".");

  // Tamper with payload data
  const tamperedData = Buffer.from(JSON.stringify({ ...payload, role: "SUPER_GOD" })).toString("base64url");
  const tamperedToken = `${tamperedData}.${sigPart}`;
  assert.equal(await verifySessionToken(tamperedToken), null);

  // Tamper with signature
  const fakeSig = sigPart.slice(0, -4) + "0000";
  const fakeSigToken = `${dataPart}.${fakeSig}`;
  assert.equal(await verifySessionToken(fakeSigToken), null);
});

test("Auth Security - Session Verification rejects expired session", async () => {
  const past = Date.now() - 100000;
  const expiredPayload: AdminSessionPayload = {
    userId: "usr_admin_123",
    email: "admin@tntrentals.com",
    fullName: "Lead Admin",
    role: "ADMIN",
    issuedAt: past - 100000,
    expiresAt: past, // already expired
  };

  const token = await signSessionToken(expiredPayload);
  assert.equal(await verifySessionToken(token), null);
});

test("Auth Security - Session Verification rejects non-admin/customer roles", async () => {
  const now = Date.now();
  const customerPayload: AdminSessionPayload = {
    userId: "usr_cust_999",
    email: "customer@gmail.com",
    fullName: "Regular Customer",
    role: "CUSTOMER" as "CUSTOMER" & UserRole,
    issuedAt: now,
    expiresAt: now + 60 * 60 * 1000,
  };

  const token = await signSessionToken(customerPayload);
  assert.equal(await verifySessionToken(token), null);
});

test("Auth Security - AdminLoginSchema validates email and password input bounds", () => {
  const valid = AdminLoginSchema.safeParse({
    email: "admin@tntrentals.com",
    password: "Password123!",
  });
  assert.equal(valid.success, true);

  const invalidEmail = AdminLoginSchema.safeParse({
    email: "not-an-email",
    password: "Password123!",
  });
  assert.equal(invalidEmail.success, false);

  const shortPassword = AdminLoginSchema.safeParse({
    email: "admin@tntrentals.com",
    password: "123", // too short
  });
  assert.equal(shortPassword.success, false);
});

test("Auth Security - Server Actions reject unauthenticated calls", async () => {
  const emptyFormData = new FormData();
  emptyFormData.set("make", "Tesla");
  emptyFormData.set("model", "Model X");

  // Since test environment has no active cookie store with admin token, these must reject
  const createVehicleRes = await createVehicleAction(emptyFormData);
  assert.equal(createVehicleRes.success, false);
  assert.ok(createVehicleRes.error?.toLowerCase().includes("unauthorized") || createVehicleRes.error?.toLowerCase().includes("privileges"));

  const updateVehicleRes = await updateVehicleAction("fake-id", emptyFormData);
  assert.equal(updateVehicleRes.success, false);
  assert.ok(updateVehicleRes.error?.toLowerCase().includes("unauthorized") || updateVehicleRes.error?.toLowerCase().includes("privileges"));

  const toggleStatusRes = await toggleVehicleStatusAction("fake-id", "MAINTENANCE");
  assert.equal(toggleStatusRes.success, false);
  assert.ok(toggleStatusRes.error?.toLowerCase().includes("unauthorized") || toggleStatusRes.error?.toLowerCase().includes("privileges"));

  const createCategoryRes = await createCategoryAction(emptyFormData);
  assert.equal(createCategoryRes.success, false);
  assert.ok(createCategoryRes.error?.toLowerCase().includes("unauthorized") || createCategoryRes.error?.toLowerCase().includes("privileges"));
});
