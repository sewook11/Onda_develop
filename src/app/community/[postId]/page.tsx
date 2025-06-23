"use client";

import PostHeader from "./_components/PostHeader";
import { useParams } from "next/navigation";
import { useFetchPost } from "@/hooks/usePost";
import PostContent from "./_components/PostContent";
import { useEffect, useState } from "react";
import CommentList from "./_components/CommentList";
import CommentInput from "./_components/CommentInput";
import Pagination from "@/components/Pagination";
import { useCreateComment, useFetchComments } from "@/hooks/useComments";
import { CommentCreatePayload } from "@/types/post";

export default function PostDetailPage() {
  const params = useParams();
  const postId = Number(params?.postId);
  const { data: post, isLoading: postLoading } = useFetchPost(postId);
  
  // 댓글 데이터 및 페이지네이션
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading: commentLoading } = useFetchComments(
    postId,
    page
  );

  const {mutate: createComment} = useCreateComment();
  const comments = data?.results || []; // 댓글 데이터가 없을 경우 빈 배열로 초기화

  const totalCount = data?.results.length ?? 0; // 댓글의 총 개수

  // 댓글 등록 핸들러
  const handleSubmitComment = (content: string) => {
    const payload: CommentCreatePayload = {
      postId,
      content: content,
    };

    createComment(payload);

    console.log("댓글 등록:", payload);
  };

  useEffect(() => {
    const postsPerPage = 10;
    const pageCount = Math.ceil(totalCount / postsPerPage);
    setTotalPages(pageCount);
  }, [totalCount]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-40">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full my-20 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      <h1 className="text-xl font-bold text-left w-full">게시판</h1>
      {postLoading && <p>로딩중입니다...</p>}
      <PostHeader
        ids={{
          id: post.id,
          category: post.category,
          interest: post.interest,
          area: post.area,
        }}
        author={{
          nickname: post.nickname,
          created_at: post.created_at,
          updated_at: post.updated_at,
          is_mine: post.is_mine,
        }}
        title={post.title}
      />
      <PostContent content={post.content} />
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
