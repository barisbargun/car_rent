import { useState, useEffect } from "react";

type ThemeProps = {
  defaultTheme?: Theme
  storageKey?: string
}

const useTheme = ({ storageKey = "dark_mode", defaultTheme = "dark" }: ThemeProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement;

    const systemThemeListener = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: any) => {
      const systemTheme = e.matches ? "dark" : "light";
      setTheme(systemTheme);
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    };
    if (theme == "system") {
      systemThemeListener.addEventListener("change", handleChange);
      setTheme(systemThemeListener.matches ? "dark" : "light");
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }



    return () => {
      removeEventListener("change", handleChange);
    };
  }, [theme]);

  return {
    theme: theme, setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    }
  };
}

export default useTheme