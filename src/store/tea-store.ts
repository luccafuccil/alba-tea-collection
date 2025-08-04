import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tea, TeaType } from "@/lib/types";
import { STORAGE_KEYS } from "@/lib/constants/ui";
import { generateUUID } from "@/lib/id-generator";

interface TeaStore {
  teas: Tea[];

  addTea: (tea: Omit<Tea, "id" | "createdAt" | "updatedAt">) => void;
  updateTea: (id: string, updates: Partial<Tea>) => void;
  deleteTea: (id: string) => void;
  toggleFavorite: (id: string) => void;

  getTea: (id: string) => Tea | undefined;
  getTeasByType: (type: TeaType) => Tea[];
  getFavoriteTeas: () => Tea[];
  getTeaCount: () => number;
}

export const useTeaStore = create<TeaStore>()(
  persist(
    (set, get) => ({
      teas: [],

      addTea: (teaData) => {
        const newTea: Tea = {
          ...teaData,
          id: generateUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          teas: [...state.teas, newTea],
        }));
      },

      updateTea: (id, updates) => {
        set((state) => ({
          teas: state.teas.map((tea) =>
            tea.id === id ? { ...tea, ...updates, updatedAt: new Date() } : tea
          ),
        }));
      },

      deleteTea: (id) => {
        set((state) => ({
          teas: state.teas.filter((tea) => tea.id !== id),
        }));
      },

      toggleFavorite: (id) => {
        set((state) => ({
          teas: state.teas.map((tea) =>
            tea.id === id
              ? { ...tea, favorite: !tea.favorite, updatedAt: new Date() }
              : tea
          ),
        }));
      },

      getTea: (id) => {
        return get().teas.find((tea) => tea.id === id);
      },

      getTeasByType: (type) => {
        return get().teas.filter((tea) => tea.type === type);
      },

      getFavoriteTeas: () => {
        return get().teas.filter((tea) => tea.favorite);
      },

      getTeaCount: () => {
        return get().teas.length;
      },
    }),
    {
      name: STORAGE_KEYS.teas,
      version: 1,
    }
  )
);
