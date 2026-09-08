import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { middleware } from "../src/middleware";
import { signSessionToken, ADMIN_COOKIE_NAME } from "../src/lib/auth/session";

test("E2E Route Guard - Unauthenticated request to /admin is redirected to /admin/login", async () => {
  const req = new NextRequest("http://localhost:3000/admin");
  const res = await middleware(req);

  assert.equal(res.status, 307);
  const location = res.headers.get("location");
  assert.ok(location?.includes("/admin/login"));
});

test("E2E Route Guard - Unauthenticated request to /admin/vehicles is redirected with return URL", async () => {
  const req = new NextRequest("http://localhost:3000/admin/vehicles");
  const res = await middleware(req);

  assert.equal(res.status, 307);
  const location = res.headers.get("location");
  assert.ok(location?.includes("/admin/login"));
  assert.ok(location?.includes("redirect=%2Fadmin%2Fvehicles"));
});

test("E2E Route Guard - Authenticated ADMIN request to /admin/vehicles is allowed", async () => {
  const token = await signSessionToken({
    userId: "adm_001",
    email: "admin@tntrentals.com",
    fullName: "Lead Administrator",
    role: "ADMIN",
    issuedAt: Date.now(),
    expiresAt: Date.now() + 600000,
  });

  const req = new NextRequest("http://localhost:3000/admin/vehicles", {
    headers: {
      cookie: `${ADMIN_COOKIE_NAME}=${token}`,
    },
  });

  const res = await middleware(req);
  // Allowed requests proceed without redirect
  assert.equal(res.status, 200);
});

test("E2E Route Guard - Authenticated ADMIN visiting /admin/login is redirected to /admin/dashboard", async () => {
  const token = await signSessionToken({
    userId: "adm_001",
    email: "admin@tntrentals.com",
    fullName: "Lead Administrator",
    role: "ADMIN",
    issuedAt: Date.now(),
    expiresAt: Date.now() + 600000,
  });

  const req = new NextRequest("http://localhost:3000/admin/login", {
    headers: {
      cookie: `${ADMIN_COOKIE_NAME}=${token}`,
    },
  });

  const res = await middleware(req);
  assert.equal(res.status, 307);
  const location = res.headers.get("location");
  assert.ok(location?.includes("/admin/dashboard"));
});
