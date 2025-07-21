import { useEffect, useState, createContext, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const [popMenu, setPopMenu] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleSliderToggle() {
    setSliderOpen((m) => !m);
  }

  function closeSlider() {
    if (!sliderOpen) return;

    setSliderOpen(false);
  }

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const togglePopMenu = () => {
    setPopMenu((current) => !current);
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    popMenu,
    setPopMenu,
    togglePopMenu,
    handleSliderToggle,
    closeSlider,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
