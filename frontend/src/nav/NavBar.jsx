import { Link, useNavigate } from "react-router";
import { useSearch } from "../context/SearchContext";
import { useTheme } from "../context/ThemeContext";
import "./style/nav.css";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { theme, toggleTheme, handleSliderToggle, sliderOpen } = useTheme();
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="navbar">
      <form action={() => navigate("/search/" + query)}>
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <div className="navbar-items">
        {!sliderOpen && (
          <button
            type="button"
            className="burger"
            aria-label="Open menu"
            aria-expanded={sliderOpen}
            onClick={handleSliderToggle}
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
        {user && (
          <Link to={"/user"}>
            <img
              src="https://www.gravatar.com/avatar/?d=mp&s=32"
              alt="User avatar"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
