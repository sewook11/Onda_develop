import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "@/types/post";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="w-full">
      {comments.map((c) => (
        <CommentItem key={c.comment_id} {...c} />
      ))}
    </div>
  );
}
