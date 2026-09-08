import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

/**
 * Hashes a plaintext password using standard scrypt with a unique random 16-byte salt.
 * Returns format: "saltHex:keyHex"
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = scryptSync(password, salt, KEY_LENGTH);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verifies a plaintext password against a stored "saltHex:keyHex" hash in constant time.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [salt, keyHex] = storedHash.split(":");
  if (!salt || !keyHex) {
    return false;
  }

  try {
    const keyBuffer = Buffer.from(keyHex, "hex");
    const derivedKey = scryptSync(password, salt, KEY_LENGTH);

    if (keyBuffer.length !== derivedKey.length) {
      return false;
    }

    return timingSafeEqual(keyBuffer, derivedKey);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}
