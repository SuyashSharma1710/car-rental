"use server";

import { prisma } from "@/lib/db/prisma";
import { AdminLoginSchema } from "@/lib/validations/auth";
import { verifyPassword } from "@/lib/auth/password";
import { setAdminSessionCookie, clearAdminSessionCookie } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface AuthActionResult {
  success: boolean;
  error?: string;
}

export async function adminLoginAction(formData: FormData): Promise<AuthActionResult> {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validated = AdminLoginSchema.safeParse(rawData);
    if (!validated.success) {
      const firstError = validated.error.issues[0]?.message || "Invalid input data.";
      return { success: false, error: firstError };
    }

    const { email, password } = validated.data;

    // Query database for administrator account
    const user = await prisma.customer.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return { success: false, error: "Invalid credentials or unauthorized access." };
    }

    // Role check: Only ADMIN and AGENT can authenticate into admin console
    if (user.role !== "ADMIN" && user.role !== "AGENT") {
      return { success: false, error: "Access denied. Administrator privileges required." };
    }

    // Verify scrypt password hash
    const isPasswordValid = verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return { success: false, error: "Invalid credentials or unauthorized access." };
    }

    // Issue secure session cookie
    await setAdminSessionCookie({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Admin login error:", error);
    return { success: false, error: "An unexpected error occurred during authentication." };
  }
}

export async function adminLogoutAction() {
  await clearAdminSessionCookie();
  revalidatePath("/admin");
  redirect("/admin/login");
}
