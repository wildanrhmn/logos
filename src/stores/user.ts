/** @format */

import { IUser } from "@/interfaces/user.interface";
import { create } from "zustand";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  archiveTender: (kode_tender: string) => void;
  unarchiveTender: (kode_tender: string) => void;
  recordTender: (kode_tender: string) => void;
  unrecordTender: (kode_tender: string) => void;
}

const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),
  archiveTender: (kode_tender: string) => {
    const user = get().user;
    if (user) {
      const tender = user.recordedTenders.find((t) => t === kode_tender);
      if (tender) {
        user.archivedTenders.push(kode_tender);
        set({ user });
      }
    }
  },
  unarchiveTender: (kode_tender: string) => {
    const user = get().user;
    if (user) {
      user.archivedTenders = user.archivedTenders.filter(
        (t) => t !== kode_tender
      );
      set({ user });
    }
  },
  recordTender: (kode_tender: string) => {
    const user = get().user;
    if (user) {
      user.recordedTenders.push(kode_tender);
      set({ user });
    }
  },
  unrecordTender: (kode_tender: string) => {
    const user = get().user;
    if (user) {
      user.recordedTenders = user.recordedTenders.filter(
        (t) => t !== kode_tender
      );
      set({ user });
    }
  },
}));

export default useUserStore;
