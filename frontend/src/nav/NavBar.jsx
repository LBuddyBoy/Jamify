import { useTheme } from "../context/ThemeContext";
import "./style/nav.css";

export default function NavBar({ menuOpen, handleToggle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="navbar">
      <form>
        <input type="text" name="search" placeholder="Search" />
      </form>
      <div className="navbar-items">
        {!menuOpen && (
          <button
            type="button"
            className="burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={handleToggle}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="theme-toggle-btn"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
        <img
          src="https://www.gravatar.com/avatar/?d=mp&s=32"
          alt="User avatar"
        />
      </div>
    </div>
  );
}
