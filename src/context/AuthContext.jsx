import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, []);
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) return;

    const fetchAdmin = async () => {
      try {
        const res = await api.get("/admin/me");
        setAdmin(res.data.admin);
        setIsLogin(true);
      } catch (err) {
        sessionStorage.clear();
        setAdmin(null);
        setIsLogin(false);
      }
    };

    fetchAdmin();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userEmail");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
