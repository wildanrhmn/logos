"use client";

import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";
import useUserStore from "@/stores/user";
import { useRouter } from "next/navigation";
import { IUser } from "../interfaces/user.interface";
import { useState } from "react";

export default function LogoutButton() {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logout() {
    setIsLoggingOut(true);
    await signOut();
    setUser({} as IUser);
    router.push("/login");
  }

  return (
    <div className="flex justify-center items-center bg-red-500 rounded-3xl py-1 px-3 hover:bg-red-600 transition-all duration-300 cursor-pointer mr-[3%]">
      {isLoggingOut ? (
        <Icon icon="line-md:loading-loop" className="w-8 h-8 text-white" />
      ) : (
        <>
            <svg
                onClick={logout}
                width="36px"
                height="36px"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(180)"
                className={isLoggingOut ? "opacity-50 pointer-events-none" : ""}
            >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                {" "}
                <g clip-path="url(#clip0_14_1899)">
                    {" "}
                    <path
                    d="M29.666 27.032L34.999 32.335L29.666 37.698"
                    stroke="#ffffff"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ></path>{" "}
                    <path
                    d="M34.999 32.335H13.667"
                    stroke="#ffffff"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ></path>{" "}
                    <path
                    d="M32.333 53.666C44.1149 53.666 53.666 44.1149 53.666 32.333C53.666 20.5511 44.1149 11 32.333 11C20.5511 11 11 20.5511 11 32.333C11 44.1149 20.5511 53.666 32.333 53.666Z"
                    stroke="#ffffff"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ></path>{" "}
                </g>{" "}
                <defs>
                    {" "}
                    <clipPath id="clip0_14_1899">
                    {" "}
                    <rect
                        width="46.666"
                        height="46.666"
                        fill="white"
                        transform="translate(9 9)"
                    ></rect>{" "}
                    </clipPath>{" "}
                </defs>{" "}
                </g>
            </svg>
            <span className={isLoggingOut ? "opacity-50 pointer-events-none text-white" : "text-white"}>
                Logout
            </span>
        </>
      )}
    </div>
  );
}
