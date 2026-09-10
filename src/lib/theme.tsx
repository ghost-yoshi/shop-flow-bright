import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme; basculer: () => void }>({
  theme: "light",
  basculer: () => {},
});

const CLE = "marche-doux-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stocke = window.localStorage.getItem(CLE) as Theme | null;
    const prefere = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(stocke ?? prefere);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const basculer = useCallback(() => {
    setTheme((t) => {
      const suivant = t === "dark" ? "light" : "dark";
      window.localStorage.setItem(CLE, suivant);
      return suivant;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, basculer }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
