"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: number;
  employee_id: string;
  email: string;
  route_access: string;
}

export function useAuth(requireAuth = true) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!storedToken || !storedUser) {
      if (requireAuth) {
        router.push("/unauthorized");
      }
      setLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setToken(storedToken);
    } catch (error) {
      console.error("Failed to parse user data:", error);
      if (requireAuth) {
        router.push("/unauthorized");
      }
    }

    setLoading(false);
  }, [requireAuth, router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return { user, token, loading, logout, isAuthenticated: !!user };
}
