"use client";
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
  file?: string | null;
}

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
