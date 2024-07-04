/** @format */

"use client";

import useNotificationStore from "@/stores/notification";
import Drawer from "@mui/material/Drawer";
import notificationData from "@/utils/notification-dummy.json";
import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import useUserStore from "@/stores/user";
import { useSession } from "next-auth/react";

interface Notification {
  id: String;
  title: String;
  message: String;
  is_read: true;
  date_added: String;
}

interface DrawerListProps {
  notifications: Notification[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  markAllAsRead: () => void;
}

export default function NotificationDrawer() {
  const { isOpen, setIsOpen, notifications, setNotifications } =
    useNotificationStore();
  const [activeTab, setActiveTab] = useState<string>("All");

  const { update } = useSession();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const markAllAsRead = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/notification/${user?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then(async (response) => {
      const data = await response.json();
      update({
        user: {
          ...user,
          notification: data.notification,
        },
      });
      setNotifications(data.notification);
    });
  };

  useEffect(() => {
    setNotifications(user?.notification);
  }, [user, setNotifications]);

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerList
        notifications={notifications}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        markAllAsRead={markAllAsRead}
      />
    </Drawer>
  );
}

function DrawerList({
  notifications,
  activeTab,
  setActiveTab,
  markAllAsRead,
}: DrawerListProps) {
  return (
    <div className="w-[330px] sm:w-[500px] lg:w-[700px] h-full bg-secondary py-5 px-5 sm:px-11 rounded-l-3xl overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          Notifications
        </h1>
        <Dropdown>
          <DropdownTrigger>
            <div className="rounded-full hover:bg-white/10 p-3 cursor-pointer transition-all duration-300">
              <div className="w-[24px] h-[24px] relative">
                <Image src="/meatballs.png" alt="moremenu" fill />
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu className="bg-white rounded-md min-w-[250px] text-sm py-2 px-1">
            <DropdownItem
              className="hover:bg-gray-200 rounded-md py-3 px-2"
              onClick={markAllAsRead}
            >
              Mark all as read
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex border-b border-white/10 mt-1 justify-between">
        <div className="flex relative w-full">
          {["All", "Unread"].map((tab) => (
            <button
              key={tab}
              className={clsx(
                "py-2 px-4 text-white transition-colors duration-300 w-1/2 text-sm sm:text-base",
                { "text-tertiary": activeTab === tab }
              )}
              onClick={() => setActiveTab(tab)}
            >
              <span className={clsx({ "text-tertiary": activeTab === tab })}>
                {tab}
              </span>
            </button>
          ))}
          <div
            className="absolute bottom-0 h-0.5 bg-tertiary transition-all duration-300"
            style={{
              width: "50%",
              left: activeTab === "All" ? "0%" : "50%",
            }}
          />
        </div>
      </div>
      <div className="mt-5">
        {notifications &&
          notifications
            ?.filter(
              (notification) => activeTab === "All" || !notification.is_read
            )
            .map((notification, index) => (
              <div key={index} className="bg-primary/20 w-full p-3 mb-2">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-sm sm:text-md">
                      {notification.title}
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-1">
                      <svg
                        width="14px"
                        height="14px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="#C3D1C1"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                      <span className="text-white/60 text-xs">
                        {notification.date_added}
                      </span>
                    </div>
                  </div>
                  {!notification.is_read && (
                    <div className="p-2 rounded-full bg-tertiary/60" />
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
