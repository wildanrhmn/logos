/** @format */

"use client";

import Header from "@/components/Header";
import useUserStore from "@/stores/user";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import NotificationDrawer from "@/components/NotificationDrawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (!user) {
      redirect("/login");
    }
  }, [user]);
  return (
    <div>
      <Header />
      <NotificationDrawer />
      <main className="mb-10">{children}</main>
    </div>
  );
}
