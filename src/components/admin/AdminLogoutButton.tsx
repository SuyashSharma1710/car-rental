"use client";

import { useTransition } from "react";
import { adminLogoutAction } from "@/lib/actions/authActions";
import { LogOut, Loader2 } from "lucide-react";

export function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await adminLogoutAction();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/50 dark:hover:text-rose-300 transition"
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      <span>Sign Out</span>
    </button>
  );
}
