import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("joinu_dark_mode", false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return { darkMode, toggleDarkMode };
}
