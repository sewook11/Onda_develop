export const BASE_URL = "https://api.ondamoim.com";

/**
 * @example
 * axios.get(END_POINT.MEETINGS);
 * axios.get(END_POINT.MEETINGS_DETAIL(meet_id));
 */

export const END_POINT = {
  // admin: 관리자 유저 목록
  ADMIN_USER: "/api/admin/users",

  // files: 업로드 관련 api
  FILES_DELETE: "/api/files/delete",
  FILES_LIST: "/api/files/list",
  FILES_UPLOAD: "/api/files/upload",

  // leaders: 리더 관련 api
  LEADERS_APPLY: "/api/leader-applies",
  LEADERS_DETAIL: (id: number) => `/api/leader-applies/${id}`, // 리더 신청 상세
  LEADERS_DETAIL_MINE: `/api/leader-applies/mine`, // 리더 신청 상세(본인기준)
  LEADERS_STATUS: (id: number) => `/api/leader-applies/${id}/status`, // 리더 신청 승인/거절 처리
  LEADERS_MEETINGS: (leader_id: number) => `/api/meets/leaders/${leader_id}`, //리더 모임 목록 조회
  LEADERS_MEETINGS_REVIEWS: `/api/reviews/my-meet`, // 리더 모임 리뷰 목록 조회
  LEADERS_DELETE: (id: number) => `/api/leader-applies/${id}/delete`, // 리더 신청 삭제

  // meetings : 모임 관련 api
  MEETINGS_SUMMARY: (meet_id: number) => `/api/meetings/${meet_id}/reviews/summary`, // 후기 요약 조회
  MEETINGS_REVIEWS: (id: number) => `/api/reviews/${id}`, // 리뷰 상세 조회/수정/삭제
  MEETINGS: "/meets/", // 모임 생성/조회
  MEETINGS_DETAIL: (meet_id: number) => `/api/meets/${meet_id}`, // 모임 상세 조회/수정/삭제
  MEETINGS_APPLY: (meet_id: number) => `/api/meets/apply/${meet_id}`, // 모임 신청
  MEETINGS_USER: (user_id: number) => `/api/meets/apply/${user_id}`, // 유저별 모임 목록

  // reviews: 리뷰관련 api
  REVIEWS: (meet_id: number) => `/api/meets/${meet_id}/reviews`, //리뷰 조회, 작성
  REVIEWS_SUMMARY: (meet_id: number) => `/api/meets/${meet_id}/reviews/summary`, //리뷰 요약 조회
  REVIEW_DETAIL: (review_id: number) => `/api/reviews/${review_id}`, //리뷰 상세 조회,수정,삭제

  // options: 옵션 관련 api
  OPTIONS: "/api/options", // 전체 옵션 목록 조회
  OPTIONS_AGE: "/api/options/age-groups", // 연령대 목록 조회
  OPTIONS_AREAS: "/api/options/areas", // 지역 목록 조회
  OPTIONS_CATEGORIES: "/api/options/categories", // 카테고리 목록 조회
  OPTIONS_DIGITAL: "/api/options/digital-levels", // 디지털 수준 목록 조회
  OPTIONS_INTEREST: "/api/options/interests", // 관심사 목록 조회

  // posts: 게시글 관련 api
  POSTS: "/api/posts", // 게시글 목록 조회/생성
  POSTS_DETAIL: (id: number) => `/api/posts/${id}`, // 게시글 상세 조회/수정/삭제

  // comments: 댓글 관련 api
  COMMENTS: (postId: number) => `/api/posts/${postId}/comments`, // 댓글 목록 조회/생성
  COMMENTS_DETAIL: (postId: number, commentId: number) => `/api/posts/${postId}/comments/${commentId}`, // 댓글 상세 조회/수정/삭제

  // users: 유저/인증 관련 api
  USERS_PASSWORD: "/api/users/check/password", // 비밀번호 확인
  USERS_EMAIL: "/api/users/verify/email", // 이메일 인증 링크 확인

  // 소셜 로그인
  USER_KAKAO_CALLBACK: "/api/users/kakao/callback", // 카카오 로그인 콜백 처리
  USER_KAKAO_LOGIN: "/api/users/kakao/login", // 카카오 로그인 리디렉션

  USERS_PROFILE: "/api/users/profile", // 유저 프로필 조회/수정/탈퇴
  USERS_SIGNUP: "/api/users/signup", // 회원가입
  USERS_LOGIN: "/api/users/token/login", // JWT 로그인
  USERS_LOGOUT: "/api/users/token/logout", // JWT 로그아웃
  USER_REFRESH: "/apiusers/token/refresh", // 엑세스 토큰 재발급
};
