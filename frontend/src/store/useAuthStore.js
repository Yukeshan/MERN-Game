import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false,
  isIncreasingScore: false, // To track score increase status

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      throw error.response?.data?.message || "Signup failed.";
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      throw error.response?.data?.message || "Login failed.";
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null }); // Clear the logged-in user state
    } catch (error) {
      console.error("Error during logout:", error.response?.data || error.message);
      throw error.response?.data?.message || "Logout failed.";
    } finally {
      set({ isLoggingOut: false });
    }
  },

  // New function to increase the total score by 10
  increaseScore: async () => {
    set({ isIncreasingScore: true });
    try {
      const res = await axiosInstance.patch("/auth/increase-score");
      set((state) => ({
        authUser: { ...state.authUser, totalScore: res.data.totalScore }, // Update the total score in the store
      }));
    } catch (error) {
      console.error("Error during increaseScore:", error.response?.data || error.message);
      throw error.response?.data?.message || "Failed to increase score.";
    } finally {
      set({ isIncreasingScore: false });
    }
  },
}));
