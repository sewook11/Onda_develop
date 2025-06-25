"use client";

import { useParams } from "next/navigation";
import { useFetchPost } from "@/hooks/usePost";
import PostContent from "./_components/PostContent";
import { useEffect, useState } from "react";
import CommentList from "./_components/CommentList";
import CommentInput from "./_components/CommentInput";
import Pagination from "@/components/Pagination";
import { useCreateComment, useFetchComments } from "@/hooks/useComments";
import { CommentCreatePayload } from "@/types/post";
import PostMetaData from "../_components/PostMetaData";
import { formatDate } from "@/utils/utils";
import PostDetailSkeleton from "./_components/PostDetailSkeleton";

export default function PostDetailPage() {
  const params = useParams();
  const postId = Number(params?.postId);
  const { data: post, isLoading: postLoading } = useFetchPost(postId);

  // 댓글 데이터 및 페이지네이션
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading: commentLoading } = useFetchComments(postId, page);

  const { mutate: createComment } = useCreateComment();
  const comments = data?.results || []; // 댓글 데이터가 없을 경우 빈 배열로 초기화

  const totalCount = data?.results.length ?? 0; // 댓글의 총 개수

  // 댓글 등록 핸들러
  const handleSubmitComment = (content: string) => {
    const payload: CommentCreatePayload = {
      postId,
      content: content,
    };

    createComment(payload);
  };

  useEffect(() => {
    const postsPerPage = 10;
    const pageCount = Math.ceil(totalCount / postsPerPage);
    setTotalPages(pageCount);
  }, [totalCount]);

  if (postLoading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    return (
      <div className="text-center text-gray-500 mt-20">게시글이 없습니다.</div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full my-20 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      <div className="w-full">
        <h1 className="text-xl font-bold text-left w-full">게시판</h1>
        {postLoading && <PostDetailSkeleton />}
        <div className="space-y-2 w-full py-10 border-b-2 border-gray-400">
          <PostMetaData
            options={{
              id: post.id,
              category: post.category,
              interest: post.interest,
              area: post.area,
            }}
            is_mine={post.is_mine}
            file={post.file ?? undefined}
          />
          <h1 className="font-semibold py-4 text-xl">{post.title}</h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{post.nickname}</span>
            <div className="flex gap-4">
              {post.updated_at ? (
                <>
                  <span>{formatDate(post.updated_at)}</span> <span>수정됨</span>
                </>
              ) : (
                <span> {formatDate(post.created_at)}</span>
              )}
            </div>
          </div>
        </div>
        <PostContent content={post.content} file={post.file} />
      </div>
      <CommentInput onSubmit={handleSubmitComment} />
      {commentLoading ? (
        <p>댓글을 불러오는 중입니다...</p>
      ) : (
        <CommentList comments={comments} postId={post.id} />
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(c) => setPage(c)}
      />
    </div>
  );
}
