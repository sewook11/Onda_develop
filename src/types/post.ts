"use client";
import { z } from "zod";
import { FileData } from "./file";

export type Post = {
  id: number;
  title: string;
  content: string;
  category: number;
  area?: number | null;
  interest?: number | null;
  file?: number | null;
  created_at: Date;
  updated_at?: Date | null;
  nickname: string;
  is_mine: boolean;
  //   likes: number;
  //   is_liked: boolean;
};

export type PostWithFile = Post & {
  fileData?: FileData | null;
}

export type PostIds = {
  id: number;
  category: number;
  area?: number | null;
  interest?: number | null;
};

export type PostAuthor = {
  created_at: Date;
  updated_at?: Date | null;
  nickname: string;
  is_mine: boolean;
};

export type PostContent = {
  content: string;
  image?: string | null;
}

// 게시글 수정/생성 시 사용하는 폼 데이터 타입
export const postSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  category: z.number().min(1, "카테고리를 선택해주세요"),
  interest: z.number().optional(),
  area: z.number().optional(),
});

export type PostFormData = z.infer<typeof postSchema> & {
  file?: File | string;
};

// 댓글 타입
export type Comment = {
  post_id: number;
  comment_id: number;
  nickname: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
  is_author: boolean;
};
