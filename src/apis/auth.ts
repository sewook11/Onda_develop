import api from "./app";
import { getCSRFCookie } from "@/utils/csrf";

export async function refreshAccessToken() {
  const csrftoken = getCSRFCookie();
  const response = await api.post("/users/token/refresh", null, {
    headers: {
      "X-CSRFToken": csrftoken,
    },
  });
  return response.data.access_token;
}
