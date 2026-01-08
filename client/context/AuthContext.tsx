"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { User } from "@/types";
import toast from "react-hot-toast";


interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    name?: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const { data } = await api.get("/auth/me");
          setUser(data); 
        }
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      setUser(data); 

      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setUser(data);

      toast.success("Account created!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  const updateProfile = async (userData: {
    name?: string;
    email?: string;
    password?: string;
  }) => {
    try {
      const { data } = await api.put("/auth/profile", userData);
      setUser((prev) =>
        prev ? { ...prev, ...data } : data
      );

      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
