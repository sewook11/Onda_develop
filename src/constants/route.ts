export const BASE_URL = 'https://api.ondamoim.com/api';

/**
 * @example
 * axios.get(END_POINT.MEETINGS);
 * axios.get(END_POINT.MEETINGS_DETAIL(meet_id));
 */

export const END_POINT = {
  // admin: 관리자 유저 목록
  ADMIN_USER: '/admin/users',

  // files: 업로드 관련 api
  FILES_DELETE: '/files/delete',
  FILES_LIST: '/files/list',
  FILES_UPLOAD: '/files/upload',

  // leaders: 리더 관련 api
  LEADERS_APPLY: "/api/leader-applies",
  LEADERS_DETAIL: (id: number) => `/leader-applies/${id}`, // 리더 신청 상세
  LEADERS_DETAIL_MINE: `/leader-applies/mine`, // 리더 신청 상세(본인기준)
  LEADERS_STATUS: (id: number) => `/leader-applies/${id}/status`, // 리더 신청 승인/거절 처리
  LEADERS_MEETINGS: (leader_id: number) => `/meets/leaders/${leader_id}`, //리더 모임 목록 조회
  LEADERS_MEETINGS_REVIEWS: `/reviews/my-meet`, // 리더 모임 리뷰 목록 조회
  LEADERS_DELETE: (id: number) => `/leader-applies/${id}/delete`, // 리더 신청 삭제


  // meetings : 모임 관련 api
  MEETINGS_SUMMARY: (meet_id: number) => `/meetings/${meet_id}/reviews/summary`, // 후기 요약 조회
  MEETINGS_REVIEWS: (id: number) => `/reviews/${id}`, // 리뷰 상세 조회/수정/삭제
  MEETINGS: '/meets/', // 모임 생성/조회
  MEETINGS_DETAIL: (meet_id: number) => `/meets/${meet_id}`, // 모임 상세 조회/수정/삭제
  MEETINGS_APPLY: (meet_id: number) => `/meets/apply/${meet_id}`, // 모임 신청
  MEETINGS_USER: (user_id: number) => `/meets/apply/${user_id}`, // 유저별 모임 목록
  LEADER_MEETINGS: (user_id: number) => `/meets/leaders/${user_id}`, // 리더별 모임 목록

  // reviews: 리뷰관련 api
  REVIEWS: (meet_id: number) => `/meets/${meet_id}/reviews`, //리뷰 조회, 작성
  REVIEWS_SUMMARY: (meet_id: number) => `/meets/${meet_id}/reviews/summary`, //리뷰 요약 조회
  REVIEW_DETAIL: (review_id: number) => `/reviews/${review_id}`, //리뷰 상세 조회,수정,삭제

  // options: 옵션 관련 api
  OPTIONS: '/options', // 전체 옵션 목록 조회
  OPTIONS_AGE: '/options/age-groups', // 연령대 목록 조회
  OPTIONS_AREAS: '/options/areas', // 지역 목록 조회
  OPTIONS_CATEGORIES: '/options/categories', // 카테고리 목록 조회
  OPTIONS_DIGITAL: '/options/digital-levels', // 디지털 수준 목록 조회
  OPTIONS_INTEREST: '/options/interests', // 관심사 목록 조회

  // posts: 게시글 관련 api
  POSTS: '/posts', // 게시글 목록 조회/생성
  POSTS_DETAIL: (id: number) => `/posts/${id}`, // 게시글 상세 조회/수정/삭제

  // comments: 댓글 관련 api
  COMMENTS: (postId: number) => `/posts/${postId}/comments`, // 댓글 목록 조회/생성
  COMMENTS_DETAIL: (postId: number, commentId: number) => `/posts/${postId}/comments/${commentId}`, // 댓글 상세 조회/수정/삭제

  // users: 유저/인증 관련 api
  USERS_PASSWORD: '/users/check/password', // 비밀번호 확인
  USERS_EMAIL: '/users/verify/email', // 이메일 인증 링크 확인

  // 소셜 로그인
  USER_KAKAO_CALLBACK: '/users/kakao/callback', // 카카오 로그인 콜백 처리
  USER_KAKAO_LOGIN: '/users/kakao/login', // 카카오 로그인 리디렉션

  USERS_PROFILE: '/users/profile', // 유저 프로필 조회/수정/탈퇴
  USERS_SIGNUP: '/users/signup', // 회원가입
  USERS_LOGIN: '/users/token/login', // JWT 로그인
  USERS_LOGOUT: '/users/token/logout', // JWT 로그아웃
  USER_REFRESH: '/users/token/refresh', // 엑세스 토큰 재발급
};
