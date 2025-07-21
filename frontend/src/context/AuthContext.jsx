import { useEffect, useState, createContext, useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      console.log("Verifying... ", token);
      await axios
        .post("/users/me", { jwt: token })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          setUser(response.data);
        });
    };

    verify();
  }, [token]);

  const register = async (credentials) => {
    await axios.post("/users/register", credentials);
    navigate("/login");
  };

  const login = async (credentials) => {
    await axios
      .post("/users/login", credentials)
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
      })
      .then((response) => {
        if (response.status !== 200) return;

        const { jwt, user } = response.data;

        setToken(jwt);
        setUser(user);
        localStorage.setItem("token", jwt);
      });
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  const exports = {
    register,
    login,
    logout,
    token,
    error,
    user,
  };

  return (
    <AuthContext.Provider value={exports}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
}
