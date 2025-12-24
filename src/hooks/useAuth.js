import { useState, useEffect } from "react";
import { http } from "../api";

export const useAuth = () => {
  const BASE_URL = "http://localhost:3000";

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage:", error);
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      await http.post(`${BASE_URL}/auth/register`, {
        email: email,
        password: password,
        name: name,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await http
        .post(`/auth/login`, {
          email: email,
          password: password,
        })
        .catch((res) => res);
      console.log(response);
      if (response.status !== 200) {
        return { success: false, response };
      }

      const data = await response.data;

      setUser(data.user);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      localStorage.setItem("access_token", JSON.stringify(data.access_token));

      return { success: true, response };
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("access_token");
  };

  const isAuthenticated = !!user;

  return {
    user,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
  };
};
