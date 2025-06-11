import { Comment } from "@/types/post";
import { formatDate } from "@/utils/utils";
import React, { useState } from "react";
import ActionMenu from "../../_components/ActionMenu";
import CommentInput from "./CommentInput";
import { useModalStore } from "@/stores/useModalStore";
import DeleteModal from "../../_components/DeleteModal";

export default function CommentItem({
  comment_id,
  nickname,
  content,
  created_at,
  updated_at,
  is_author,
}: Pick<
  Comment,
  | "comment_id"
  | "nickname"
  | "content"
  | "created_at"
  | "updated_at"
  | "is_author"
>) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditComment = () => {
    setIsEditing(true);
  };
  const { openModal } = useModalStore();

  const handleSubmit = (newContent: string) => {
    // TODO: 수정 로직 연결
    console.log(`댓글 ${comment_id} 수정 : ${newContent}`);
    setIsEditing(false);
  };

  const handleCalcle = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-full border-b pt-4 relative">
      {isEditing ? (
        <CommentInput
          mode="edit"
          initialValue={content}
          onSubmit={handleSubmit}
          onCancel={handleCalcle}
        />
      ) : (
        <>
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex gap-4 mb-2">
              <span className="font-medium text-gray-700">{nickname}</span>
              <span className="text-gray-600">
                {updated_at ? (
                  <>
                    <span>{formatDate(updated_at)}</span> <span>수정됨</span>
                  </>
                ) : (
                  <span> {formatDate(created_at)}</span>
                )}
              </span>
            </div>
            {is_author && (
              <ActionMenu
                targetId={comment_id}
                onEdit={handleEditComment}
                onDelete={() => openModal("DeleteModal")}
              />
            )}
            <DeleteModal
            // TODO 삭제 메소드 추가
            />
          </div>
          <p className="mt-2 text-gray-800 mb-4 text-md">{content}</p>
        </>
      )}
    </div>
  );
}
