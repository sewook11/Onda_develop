"use client"
import { z } from "zod";

export type Post = {
  post_id: number;
  title: string;
  content: string;
  category_id: number | null;
  digitalLevel_id: number | null;
  nickname: string;
  area_id?: number | null;
  interest_id: number | null;
  image_url?: string | null;
  created_at: Date;
  updated_at?: Date;
  is_author: boolean;
  //   likes: number;
  //   is_liked: boolean;
};

// 게시글 수정/생성 시 사용하는 폼 데이터 타입
export const postSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  category_id: z.number().min(1, "카테고리를 선택해주세요"),
  interest_id: z.number().min(1, "관심사를 선택해주세요"),
  digitalLevel_id: z.number().min(1, "디지털 난이도를 선택해주세요"),
  // area_id: z.string().min(1, "지역을 선택해주세요"),
  images: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .refine((val) => {
      if (!val) return true;
      if (typeof val === "string") return true; // string은 유효
      return val.size <= 20 * 1024 * 1024; // File 용량 체크
    }, {
      message: "10MB 이하의 파일만 업로드할 수 있습니다.",
    }),
  });

export type PostFormData = z.infer<typeof postSchema>;

export interface PostFormProps {
  initialValue?: Post;
  onSubmit: (newPost: PostFormData) => void;
  mode?: "create" | "edit";
  onCancel?: () => void;
}

// PostHeader 컴포넌트 prop 타입
export type PostHeaderProps = {
  post_id: number;
  nickname: string;
  created_at: Date;
  updated_at?: Date;
  category_id: number | null;
  interest_id: number | null;
  area_id: number | null;
  digitalLevel_id: number | null;
  is_author: boolean;
  title: string;
};

// PostMetaData 컴포넌트 prop 타입
export type PostMetaDataProps = {
  post_id: number;
  category_id: number | null;
  interest_id: number | null;
  area_id: number | null;
  digitalLevel_id: number | null;
  is_author: boolean;
};

// PostContent 컴포넌트 prop 타입
export type PostContentProps = {
  image?: string | null;
  content: string;
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
