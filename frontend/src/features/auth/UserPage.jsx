import { useAuth } from "../../context/AuthContext";

export default function UserPage() {
  const { logout } = useAuth();
  return (
    <div className="userContainer">
      <button onClick={logout}>Logout</button>
    </div>
  );
}
