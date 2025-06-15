import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/apis/app";
import { END_POINT } from "@/constants/route";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  nickname: string;
  name: string;
  role: "user" | "admin" | "leader"; // 명세서 기준
}
interface User {
  email: string;
  password?: string;
  name: string;
  nickname: string;
  phone?: string;
  selectedSido?: string;
  selectedDistrict?: string | null;
  interest_id?: number | null;
  area_id?: number | null;
  role: "user" | "admin" | "leader";
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  login: boolean;
  accessToken: string | null;
  csrfToken: string | null;
  isAdmin: boolean;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  reset: () => void;
}

interface AuthActions {
  setUser: (user: User) => void;
  setLogin: (email: string, password: string) => Promise<boolean>;
  setLogout: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: false,
      accessToken: null,
      csrfToken: null,
      isAdmin: false,
      email: "",
      password: "",

      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),

      setUser: (user) => {
        set({
          user,
          isAdmin: !!user?.isAdmin,
        });
      },
      setLogin: async (email: string, password: string) => {
        try {
          const res = await api.post(END_POINT.USERS_LOGIN, {
            email,
            password,
          });

          const { access_token, csrf_token } = res.data;

          const decoded: DecodedToken = jwtDecode(access_token);

          const isAdmin =
            decoded.role === "admin" ||
            decoded.role === "leader" ||
            decoded.role === "user";
          console.log("decoded", decoded);

          set({
            login: true,
            accessToken: access_token,
            csrfToken: csrf_token,
            isAdmin,
            user: {
              email: decoded.email,
              name: decoded.name,
              nickname: decoded.nickname,
              role: decoded.role,
              isAdmin,
            },
          });
          localStorage.setItem("accessToken", access_token);
          return true;
        } catch (err) {
          console.error("로그인 실패:", err);
          return false;
        }
      },

      setLogout: () => {
        set({
          user: null,
          login: false,
          accessToken: null,
          csrfToken: null,
          isAdmin: false,
        });
        localStorage.removeItem("accessToken");

        import("@/stores/useSignUpStore").then(({ useSignupStore }) => {
          useSignupStore.getState().resetForm();
        });
      },
      reset: () => set({ email: "", password: "" }),
    }),
    {
      name: "auth-storage",
    }
  )
);
