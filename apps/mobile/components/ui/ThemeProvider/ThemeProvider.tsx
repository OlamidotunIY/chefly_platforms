"use client";

import type { ReactNode } from "react";
import Storage from "expo-sqlite/kv-store";
import { useColorScheme } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

type Theme = "light" | "dark" | "system";

const themeCycle: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: themeCycle[state.theme],
        })),
    }),
    {
      name: "theme",
      storage: createJSONStorage(() => Storage),
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <GluestackUIProvider mode={theme}>{children}</GluestackUIProvider>
  );
}

export function useTheme() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const systemTheme = useColorScheme();
  const resolvedTheme: Exclude<Theme, "system"> =
    theme === "system"
      ? systemTheme === "dark"
        ? "dark"
        : "light"
      : theme;

  return { theme, resolvedTheme, setTheme, toggleTheme };
}

export { useThemeStore };
export type { Theme };
