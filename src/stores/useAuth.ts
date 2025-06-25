import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/apis/app";
import { END_POINT } from "@/constants/route";
import { jwtDecode } from "jwt-decode";
import type { StateCreator } from "zustand";
import { Profile } from "@/app/mypage/_components/UserProfile";

interface DecodedToken {
  email: string;
  nickname: string;
  name: string;
  role: "user" | "admin" | "leader";
}

interface User {
  email: string;
  password?: string;
  name: string;
  nickname: string;
  phone?: string;
  selectedSido?: string;
  selectedDistrict?: string | null;
  interest_ids?: number | null;
  area_id?: number | null;
  role: "user" | "admin" | "leader";
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  login: boolean;
  accessToken: string | null;
  csrfToken: string | null;
  isAdmin: boolean;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  isKakaoUserSignedUp: boolean;
  setKakaoUserSignedUp: (value: boolean) => void;
  reset: () => void;
}

interface AuthActions {
  setUser: (user: User) => void;
  setLogin: (email: string, password: string) => Promise<boolean>;
  setLogout: () => void;
  setAccessToken: (token: string) => void;
  setCsrfToken: (token: string) => void;
}

type AuthStore = AuthState & AuthActions;

const authStoreCreator: StateCreator<AuthStore> = (set) => ({
  user: null,
  login: false,
  profile: null,
  setProfile: (profile) => set({ profile }),
  accessToken: null,
  csrfToken: null,
  isAdmin: false,
  email: "",
  password: "",
  isKakaoUserSignedUp: false,
  setKakaoUserSignedUp: (value: boolean) =>
    set(() => ({ isKakaoUserSignedUp: value })),

  setEmail: (email: string) => set({ email }),
  setPassword: (password: string) => set({ password }),
  setAccessToken: (token: string) => set({ accessToken: token }),
  setCsrfToken: (token: string) => set({ csrfToken: token }),

  setUser: (user: User) => {
    set({
      user,
      isAdmin: !!user?.isAdmin,
    });
  },

  setLogin: async (email: string, password: string) => {
    try {
      const res = await api.post(END_POINT.USERS_LOGIN, { email, password });
      const { access_token, csrf_token } = res.data;

      const decoded: DecodedToken = jwtDecode(access_token);
      const isAdmin = decoded.role === "admin"

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
  },

  reset: () => set({ email: "", password: "" }),
});

export const useAuthStore = create<AuthStore>()(
  persist(authStoreCreator, {
    name: "auth-storage",
  })
);
