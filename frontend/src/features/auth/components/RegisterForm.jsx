import { Link } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import "../style/registerForm.css";

export default function RegisterForm() {
  const { register, error } = useAuth();

  const handleSubmit = async (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const credentials = { username, email, password };

    await register(credentials);
  };

  return (
    <form action={handleSubmit} id="registerForm">
      <h1>Register</h1>
      <input type="text" name="username" placeholder="Username" required />
      <input type="text" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      {error && <p className="errorText">{error}</p>}
      <p>
        Already have an account? <Link to={"/login"}>Login here!</Link>
      </p>
      <button>Register</button>
    </form>
  );
}
