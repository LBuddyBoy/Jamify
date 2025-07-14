import { useState } from "react";
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SongPlaying from "../components/SongPlaying";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleToggle() {
    setMenuOpen(m => !m);
  }

  function closeMenu() {
    if (!menuOpen) return;

    setMenuOpen(false);
  }

  return (
    <div onClick={closeMenu}>
      <SideBar menuOpen={menuOpen} closeMenu={closeMenu} />
      <div className="main-content">
        <NavBar menuOpen={menuOpen} handleToggle={handleToggle} />
        <main>
          <Outlet />
          <SongPlaying/>
        </main>
      </div>
    </div>
  );
}
