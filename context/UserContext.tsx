import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { useAuth } from "./AuthContext";
import axios from "axios";
import Constants from "expo-constants";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { UserContextProps } from "./types";

const { API_URL, TOKEN_KEY } = Constants.expoConfig?.extra || {};

const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  refreshUser: async () => {},
  updateUser: () => Promise.resolve(),
  deleteUser: () => Promise.resolve(),
  changePassword: () => Promise.resolve(),
  loadUser: () => Promise.resolve(),
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { authState, onLogout } = useAuth();
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

  const updateUser = async (data: Partial<User>) => {
    if (!authState?.token) return;

    try {
      await axios.put(`${API_URL}/user`, data, {
        headers: { authorization: `Bearer ${authState.token}` },
      });
      await loadUser(); // Refresh user after update
    } catch (error: any) {
      console.error("Failed to update user:", error.message);
      throw error;
    }
  };

  const deleteUser = async () => {
    if (!authState?.token) return;

    try {
      await axios.delete(`${API_URL}/user`, {
        headers: { authorization: `Bearer ${authState.token}` },
      });
      setUser(null); // User deleted
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      onLogout?.(); // Clear auth state if defined
      // 🔁 Redirect to home or any other screen
      router.replace("/Home"); // Replace with "/login" or "/welcome" if needed
    } catch (error: any) {
      console.error("Failed to delete user:", error.message);
      throw error;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    if (!authState?.token) return;

    try {
      await axios.put(
        `${API_URL}/user/password`,
        { oldPassword, newPassword },
        {
          headers: { authorization: `Bearer ${authState.token}` },
        }
      );
    } catch (error: any) {
      console.error("Failed to change password:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    loadUser();
  }, [authState?.token]); // Refetch if token changes (login/logout)

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refreshUser: loadUser,
        updateUser,
        deleteUser,
        changePassword,
        loadUser, // Expose loadUser for manual refresh if needed
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
