"use client";

import axios from "axios";
import { useAuthStore } from "@/stores/useAuth";
import { BASE_URL } from "@/constants/route";
import { getCSRFCookie } from "@/utils/csrf";

// export async function refreshAccessToken() {
//   const csrfToken = useAuthStore.getState().csrfToken;

//   console.log("csrfToken", csrfToken);
//   const response = await axios.post(
//     `${BASE_URL}/api/users/token/refresh`,
//     null,
//     {
//       headers: {
//         "X-CSRFToken": csrfToken,
//       },
//       withCredentials: true, // 쿠키를 포함하기 위해
//     }
//   );
//   return response.data.access_token;
// }
export async function refreshAccessToken() {
  const csrfToken = useAuthStore.getState().csrfToken || getCSRFCookie();
  const { setAccessToken, setCsrfToken } = useAuthStore.getState();

  console.log("📦 기존 csrfToken:", csrfToken);

  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/token/refresh`,
      null,
      {
        headers: {
          "X-CSRFToken": csrfToken || "", // 없으면 빈 문자열
        },
        withCredentials: true, // HttpOnly 쿠키 포함
      }
    );

    const { access_token, csrf_token: newCsrfToken } = response.data;

    // ✅ 상태 저장
    setAccessToken(access_token);
    if (newCsrfToken) {
      setCsrfToken(newCsrfToken);
    }

    return access_token;
  } catch (error) {
    console.error("🔁 토큰 리프레시 실패 ❌", error);
    throw error;
  }
}
