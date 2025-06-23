import { BASE_URL } from "@/constants/route";
import { useAuthStore } from "@/stores/useAuth";
import axios from "axios";
import { refreshAccessToken } from "./auth";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { accessToken, csrfToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const is401 = error.response?.status === 401;
    const isNotRetry = !originalRequest._retry;

    if (is401 && isNotRetry) {
      console.log("액세스 토큰 만료, 리프레시 시도 중...");
      originalRequest._retry = true;

      try {
        // ⭐ refreshAccessToken 내에서 상태 리셋하지 않도록 조절
        const newAccessToken = await refreshAccessToken();
        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("리프레시 실패 ❌", err);
        // ❗ 여기서만 상태 리셋
        useAuthStore.getState().setLogout?.();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
