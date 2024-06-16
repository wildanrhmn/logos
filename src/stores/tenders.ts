import { ITender } from "@/interfaces/tender.interface";
import { create } from "zustand";

interface TendersState {
    tenders: ITender[];
    setTenders: (tenders: ITender[]) => void;
}

const useTendersStore = create<TendersState>((set) => ({
    tenders: [],
    setTenders: (tenders: ITender[]) => set({ tenders }),
}));

export default useTendersStore;