import { BASE_URL } from "@/constants/route";
import axios from "axios";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 임시 액세스 토큰 하드 코딩
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5ODIzOTY1LCJpYXQiOjE3NDk4MjAzNjUsImp0aSI6IjE3OTBjM2IzMDY0ZDRkZWFhNjU3YzczMmIwY2IwZGU0IiwidXNlcl9pZCI6NSwiZW1haWwiOiJsZWFkZXIxQHRlc3QuY29tIiwibmFtZSI6ImxlYWRlcjEiLCJuaWNrbmFtZSI6ImxlYWRlcjEiLCJwcm92aWRlciI6ImhvbWUiLCJyb2xlIjoibGVhZGVyIn0.PQOR8IKQgijDJ8EKo7BCJHJJXMFbSHBujITv_ABNorw`;
  return config;
});

export default api;
