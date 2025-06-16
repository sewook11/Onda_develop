"use client";

import PostHeader from "./_components/PostHeader";
import { useParams } from "next/navigation";
import { useFetchPost } from "@/hooks/usePost";
import PostContent from "./_components/PostContent";
import CommentList from "./_components/CommentList";
import CommentInput from "./_components/CommentInput";
import { dummyComments } from "@/datas/dummyComments";
import { Comment } from "@/types/post";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";

export default function PostDetailPage() {
  const params = useParams();
  const postId = Number(params?.postId);
  const { data: post, isLoading } = useFetchPost(postId);

  // 댓글 데이터 및 페이지네이션
  const comments: Comment[] = dummyComments.filter((c) => c.post_id === postId);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const commentsPerPage = 5;
    const pageCount = Math.ceil(comments.length / commentsPerPage);
    setTotalPages(pageCount);
  }, [comments]);

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
      {isLoading && (<p>로딩중입니다...</p>)}
      <PostHeader
        ids={{
          id: post.id,
          category: post.category,
          interest: post.interest,
          area: post.area
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
      <CommentInput onSubmit={() => console.log("댓글 등록")} />
      <CommentList comments={comments} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(c) => setPage(c)}
      />
    </div>
  );
}
