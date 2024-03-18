import {create} from "zustand";
import {Store} from "@/@types/count";

export const useCounter = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({count: state.count + 1})),
}))