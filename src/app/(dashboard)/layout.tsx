"use client";

import Header from "@/components/Header";
import useUserStore from "@/stores/user";
import { useEffect } from "react";
import { redirect } from "next/navigation";

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
            <main className="pt-10 pb-28">{children}</main>
        </div>
    );
}
