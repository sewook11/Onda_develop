import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { Comment } from "@/types/post";
import { CornerDownRight } from "lucide-react";

interface ReplyListProps {
  replies: Comment[] | undefined;
}

export default function ReplyList({ replies }: ReplyListProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!replies || replies.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        className="flex items-center gap-2 text-sm text-gray-600 hover:underline w-fit"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CornerDownRight
          size={16}
        />
        <span className="text-sm">{isOpen ? "답글 숨기기" : `답글 ${replies.length}개 보기`}</span>
      </button>

      {isOpen &&
        replies.map((reply) => (
          <div key={reply.id} className="flex gap-4 ml-4">
            <CornerDownRight className="my-4 text-gray-400" size={16} />
            <CommentItem comment={reply} />
          </div>
        ))}
    </div>
  );
}
