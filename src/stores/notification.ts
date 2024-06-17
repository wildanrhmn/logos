import { create } from "zustand";

interface NotificationState {
    notifications: any[];
    isOpen: boolean;
    setNotifications: (notifications: any[]) => void;
    setIsOpen: (isOpen: boolean) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    isOpen: false,
    setNotifications: (notifications) => set({ notifications }),
    setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useNotificationStore;