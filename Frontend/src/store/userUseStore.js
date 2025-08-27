import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  isSigninIn: false,
  isLogginIn: false,
  isLoggingOut: false,

  signup: async (creadiential) => {
    set({ isSigninIn: true });
    try {
      const response = await axios.post("/api/auth/signup", creadiential);
      console.log("yeta aayo error");
      set({ user: response.data.data, isSigninIn: false });

      toast.success("account created");
    } catch (error) {
      toast.error(error?.response?.data?.message || "an error occurred");
      set({ user: null, isSigninIn: false });
    }
  },

   login: async (creadiential) => {
    set({ isLogginIn: true });
    try {
      const response = await axios.post("/api/auth/login", creadiential);
    //   console.log("yeta aayo error");
      set({ user: response.data.user,  isLogginIn: false});
      toast.success("Logged in successfully");

      return response.data.user;
    } catch (error) {
      toast.error(error?.response?.data?.message || "an error occurred");
      set({ user: null,  isLogginIn: false, });
      return null
    }
  },
logout: async () => {
  set({ isLoggingOut: true });
  try {
    await axios.post("/api/auth/logout");
    set({ user: null, isLoggingOut: false });
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
    set({ isLoggingOut: false });
    throw error;
  }
}

}));
