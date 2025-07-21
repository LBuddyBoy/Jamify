import { NavLink } from "react-router";
import "./style/sidebar.css";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function SideBar() {
  const { closeSlider, sliderOpen } = useTheme();
  const { user } = useAuth();

  return (
    <nav className={`sidebar${sliderOpen ? " open" : ""}`}>
      <header>
        <NavLink to={"/"}>
          <img src="/logo.png"></img>
        </NavLink>
      </header>
      <div className={`sidebar-items${sliderOpen ? " show" : ""}`}>
        {user ? (
          <NavLink to="/playlists" onClick={closeSlider}>
            Playlists
          </NavLink>
        ) : (
          <>
            <NavLink to="/register" onClick={closeSlider}>
              Register
            </NavLink>
          </>
        )}
        <NavLink to="/artists" onClick={closeSlider}>
          Artists
        </NavLink>
        <NavLink to="/explore" onClick={closeSlider}>
          Explore
        </NavLink>
      </div>
    </nav>
  );
}
