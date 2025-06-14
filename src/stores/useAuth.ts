import { create } from "zustand";
import api from "@/apis/app";
import { END_POINT } from "@/constants/route";

interface User {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  selectedSido: string;
  selectedDistrict: string | null;
  interest_id: number | null;
  area_id: number | null;
  isAdmin?: boolean;
}

export interface AuthState {
  email: string;
  password: string;
  currentUser: User | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setCurrentUser: (user: User) => void;
  reset: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  password: "",
  currentUser: null,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setCurrentUser: (user) => set({ currentUser: user }),

  reset: () => set({ email: "", password: "" }),

  login: async (email: string, password: string) => {
    try {
      const response = await api.post(END_POINT.USERS_LOGIN, {
        email,
        password,
      });
      const user = response.data;
      set({ currentUser: user });

      localStorage.setItem("currentUser", JSON.stringify(user));

      return true;
    } catch (err) {
      console.error("로그인 실패 :", err);
      return false;
    }
  },
  logout: () => {
    set({ currentUser: null });
    localStorage.removeItem("currentUser");

    // signupStore 초기화
    import("@/stores/useSignUpStore").then(({ useSignupStore }) => {
      useSignupStore.getState().resetForm();
    });
  },
}));
