import { create } from "zustand";

interface User {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
  selectedSido: string;
  selectedDistrict: string | null;
  selectedInterests: string[];
}

export interface AuthState {
  email: string;
  password: string;
  users: User[];
  currentUser: User | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  addUser: (user: User) => void;
  setCurrentUser: (user: User) => void;
  reset: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}
const savedUsers =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("users") || "[]")
    : [];
export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  password: "",
  users: savedUsers,
  currentUser: null,

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  addUser: (newUser: User) =>
    set((state) => {
      const updatedUsers = [...state.users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers, currentUser: newUser };
    }),

  setCurrentUser: (user) => set({ currentUser: user }),

  reset: () => set({ email: "", password: "" }),

  login: (email, password) => {
    const matchedUser = get().users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      set({ currentUser: matchedUser });
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      return true;
    }
    return false;
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
