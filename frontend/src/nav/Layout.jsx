import { Outlet } from "react-router";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import SongPlaying from "../components/SongPlaying";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { closeSlider } = useTheme();

  return (
    <div onClick={closeSlider}>
      <SideBar />
      <div className="main-content">
        <NavBar />
        <main>
          <Outlet />
          <SongPlaying/>
        </main>
      </div>
    </div>
  );
}
