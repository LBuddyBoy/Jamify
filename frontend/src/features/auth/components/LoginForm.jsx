import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import "../style/loginForm.css";

export default function LoginForm() {
  const { login, error } = useAuth();

  const handleSubmit = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const credentials = { email, password };

    await login(credentials);
  };

  return (
    <form action={handleSubmit} id="loginForm">
      <h1>Login</h1>
      <input type="text" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      {error && <p className="errorText">{error}</p>}
      <p>
        {"Don't have an account?"} <Link to={"/register"}>Register here!</Link>
      </p>
      <button>Login</button>
    </form>
  );
}
