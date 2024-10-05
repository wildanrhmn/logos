/** @format */

"use client";

import Header from "@/components/Header";
import NotificationDrawer from "@/components/NotificationDrawer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useUserStore from "@/stores/user";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        username: session.user.username,
        archivedTenders: session.user.archive,
        recordedTenders: session.user.record,
        config: session.user.config,
        notification: session.user.notification,
      });
    }

  }, [session, setUser]);

  if (!user) {
    router.push("/login");
  }

  return (
    <div>
      <Header />
      <NotificationDrawer />
      <main>{children}</main>
    </div>
  );
}
