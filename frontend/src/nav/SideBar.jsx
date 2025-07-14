import { NavLink } from "react-router";
import "./style/sidebar.css";

export default function SideBar({ menuOpen, closeMenu }) {
  return (
    <nav className={`sidebar${menuOpen ? " open" : ""}`}>
      <header>
        <NavLink to={"/"}>
          <img src="/logo.png"></img>
        </NavLink>
      </header>
      <div className={`sidebar-items${menuOpen ? " show" : ""}`}>
        <NavLink to="/playlists" onClick={closeMenu}>Playlists</NavLink>
        <NavLink to="/artists" onClick={closeMenu}>Artists</NavLink>
        <NavLink to="/explore" onClick={closeMenu}>Explore</NavLink>
      </div>
    </nav>
  );
}
