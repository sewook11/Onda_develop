export function getCSRFCookie(): string {
  if (typeof document === "undefined") return ""; // 서버 사이드 보호
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  console.log("match", match, document.cookie);
  return match ? match[1] : "";
}
