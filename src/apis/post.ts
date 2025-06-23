import { END_POINT } from "@/constants/route";
import api from "./app";
import { Post } from "@/types/post";


// Post 업로드
export interface PostCreatePayload {
  title: string;
  content: string;
  area?: number | null;
  category?: number;
  interest?: number | null;
  file?: number | null;
}
export interface PostCreateResponse {
  id: number;
  title: string;
  content: string;
  category: number;
  area?: number;
  interest?: number;
  file?: number;
  created_at: Date;
  updated_at?: Date;
  nickname: string;
  is_mine: boolean;
}

export interface PostsResponse {
  count: number;
  next: number | null;
  previous: number | null;
  results: Post[];
}

export const postCreate = async (
  payload: PostCreatePayload
): Promise<PostCreateResponse> => {
  const response = await api.post<PostCreateResponse>(END_POINT.POSTS, payload);
  console.log("게시글 업로드", response);

  return response.data;
};

// Post 목록 조회
export const getPosts = async (page: number): Promise<PostsResponse> => {
  const response = await api.get<PostsResponse>(
    `${END_POINT.POSTS}?page=${page}`
  );
  console.log("게시글 목록", response.data);

  return response.data;
};

// Post 상세 조회
export const getPost = async (id: number) => {
  const response = await api.get<Post>(END_POINT.POSTS_DETAIL(id));
  console.log(`${id} 게시글`, response.data);

  return response.data;
};

// Post 전체 수정
export const putPost = async (id: number, payload: PostCreatePayload) => {
  const response = await api.put<Post>(END_POINT.POSTS_DETAIL(id), payload);
  console.log(`${id} 게시글 전체 수정`, response.data);

  return response.data;
};

// Post 부분 수정
export const patchPost = async (id: number, payload: PostCreatePayload) => {
  const response = await api.patch<Post>(END_POINT.POSTS_DETAIL(id), payload);
  console.log(`${id} 게시글 부분 수정`, response.data);

  return response.data;
};

// Post 삭제
export const deletePost = async (id: number) => {
  const response = await api.delete(END_POINT.POSTS_DETAIL(id));
  console.log(`${id} 게시글 삭제`, response.data);

  return response.data;
};
