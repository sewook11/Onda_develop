import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "@/types/post";

interface CommentListProps {
  comments: Comment[] | undefined;
  postId: number;
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return <div className="text-center text-gray-500">댓글이 없습니다.</div>;
  }

  return (
    <div className="w-full">
      {comments.map((c) => (
        <CommentItem key={c.id} {...c} />
      ))}
    </div>
  );
}
