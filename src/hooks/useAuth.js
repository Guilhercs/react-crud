import { useState, useEffect } from "react";

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
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      });

      if (response.status == 400) {
        throw new Error("HTTP Error: ", response);
      }

      return { success: true, response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status == 400) {
        throw new Error("HTTP Error: ", response);
      }

      const data = await response.json();

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
