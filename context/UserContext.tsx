// context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/app/Home";
import { useAuth } from "./AuthContext";
import axios from "axios";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig?.extra || {};

interface UserContextProps {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  refreshUser: async () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    if (!authState?.token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          authorization: `Bearer ${authState.token}`,
        },
      });
      console.log("🔵 Loaded user:", response.data);
      setUser(response.data);
    } catch (error: any) {
      console.error("Failed to load user:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [authState?.token]); // Refetch if token changes (login/logout)

  return (
    <UserContext.Provider value={{ user, loading, refreshUser: loadUser }}>
      {children}
    </UserContext.Provider>
  );
};
