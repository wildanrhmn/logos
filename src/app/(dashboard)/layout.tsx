"use client";

import Header from "@/components/Header";
import NotificationDrawer from "@/components/NotificationDrawer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useUserStore from "@/stores/user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        username: session.user.username,
        archivedTenders: session.user.archive,
        recordedTenders: session.user.record,
        config: session.user.config
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div>
      <Header />
      <NotificationDrawer />
      <main>{children}</main>
    </div>
  );
}
