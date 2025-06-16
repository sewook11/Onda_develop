"use client";

import { useParams, useRouter } from "next/navigation";
import { useFetchPost } from "@/hooks/usePost";
import { PostFormData } from "@/types/post";
import PostForm from "../../write/_components/PostForm";

export default function PostEditPage() {
  const router = useRouter();
  const { postId } = useParams();
  const { data: post, isLoading } = useFetchPost(Number(postId));

  const handleUpdate = async (updatedData: PostFormData) => {
    try {
      console.log("수정 요청 데이터:", updatedData);
      // TODO: 게시글 수정 API 호출
      router.push(`/community/${postId}`);
    } catch (err) {
      console.error("수정 실패", err);
    }
  };

  if (!post) {
    return <div className="text-center py-20">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center w-full my-20 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      {isLoading && (<p>로딩중입니다...</p>)}
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold text-left w-full">글 쓰기</h1>
      </div>
      <PostForm
        mode="edit"
        initialValue={post}
        onSubmit={handleUpdate}
        onCancel={() => router.back()}
      />
    </div>
  );
}
