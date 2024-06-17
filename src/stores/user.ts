import { IUser } from "@/interfaces/user.interface";
import { ITender } from "@/interfaces/tender.interface";
import { create } from "zustand";

interface UserState {
    user: IUser | null;
    setUser: (user: IUser) => void;
    archiveTender: (tender: ITender) => void;
    unarchiveTender: (tender: ITender) => void;
    recordTender: (tender: ITender) => void;
    unrecordTender: (tender: ITender) => void;
}

const useUserStore = create<UserState>((set, get) => ({
    user: null,
    setUser: (user: IUser) => set({ user }),
    archiveTender: (tender: ITender) => {
        const user = get().user;
        if (user) {
            user.archivedTenders.push(tender);
            set({ user });
        }
    },
    unarchiveTender: (tender: ITender) => {
        const user = get().user;
        if (user) {
            user.archivedTenders = user.archivedTenders.filter((t) => t.kode_tender !== tender.kode_tender);
            set({ user });
        }
    },
    recordTender: (tender: ITender) => {
        const user = get().user;
        if (user) {
            user.recordedTenders.push(tender);
            set({ user });
        }
    },
    unrecordTender: (tender: ITender) => {
        const user = get().user;
        if (user) {
            user.recordedTenders = user.recordedTenders.filter((t) => t.kode_tender !== tender.kode_tender);
            set({ user });
        }
    }
}));

export default useUserStore;