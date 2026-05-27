import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("accessToken", null);

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (token) => {
    // localStorage.setItem("accessToken", token);
    setUser(token);
    const decoded = jwtDecode(token);

    localStorage.setItem("user", JSON.stringify(decoded));
    navigate("/sidebar");
  };

  // call this function to sign out logged in user
  const logout = () => {
    // localStorage.removeItem("accessToken");
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};


