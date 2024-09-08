import { create } from "zustand";

interface PopUpStore {
  isOpen: boolean;
  toggleIsOpen: () => void;
  close: () => void;
}

const usePopUpStore = create<PopUpStore>((set) => ({
  isOpen: false,
  toggleIsOpen: () => set((store) => ({ isOpen: !store.isOpen })),
  close: () => set(() => ({ isOpen: false })),
}));

export default usePopUpStore;
