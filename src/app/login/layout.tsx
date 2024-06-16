'use client'

import useUserStore from "@/stores/user";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (user) {
            redirect("/home");
        }
    }, [user]);

    return (
        <main>{children}</main>
    );
}