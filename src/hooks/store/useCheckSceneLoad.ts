import { create } from "zustand";

interface ICheckSceneLoad {
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

export const useCheckSceneLoad = create<ICheckSceneLoad>((set) => ({
  isLoaded: false,
  setLoaded: (loaded: boolean) => set({ isLoaded: loaded }),
}));
