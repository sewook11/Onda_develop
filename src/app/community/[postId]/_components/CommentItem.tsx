import { Comment } from "@/types/post";
import { formatDate } from "@/utils/utils";
import React, { useState } from "react";
import ActionMenu from "../../_components/ActionMenu";
import CommentInput from "./CommentInput";
import { useModalStore } from "@/stores/useModalStore";
import DeleteModal, { DeleteModalData } from "../../_components/DeleteModal";
import { useDeleteComment, useUpdateComment } from "@/hooks/useComments";

export default function CommentItem(comment: Comment) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { openModal } = useModalStore();

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleSubmit = (newContent: string) => {
    try {
      if (!newContent.trim()) {
        throw new Error("댓글 내용이 비어있습니다.");
      }
      // 댓글 내용이 변경되지 않은 경우
      if (newContent === comment.content) {
        setIsEditing(false);
        return;
      }
      // 댓글 내용이 변경된 경우
      updateComment(
        {
          id: comment.id,
          postId: comment.post,
          content: newContent,
          parent: comment.parent ?? null,
        },
        {
          onSuccess: () => {
            console.log("댓글 수정 성공");
            setIsEditing(false);
          },
          onError: (error) => {
            console.error("댓글 수정 실패:", error.message);
            openModal("PostFailModal", {
              message: "댓글 수정에 실패했습니다.",
            });
            setIsEditing(false);
          },
        }
      );
    } catch (error) {
      console.error("댓글 수정 오류:", error);
      openModal("PostFailModal", {
        message: "댓글 수정에 실패했습니다.",
      });
    }
  };

  const handleDeleteComment = (data: DeleteModalData) => {
    if (
      data.type === "comment" &&
      typeof data.id === "number" &&
      typeof data.postId === "number"
    ) {
      deleteComment({ id: data.id, postId: data.postId });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-full border-b pt-4 relative">
      {isEditing ? (
        <CommentInput
          mode="edit"
          initialValue={comment.content}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex gap-4 mb-2">
              <span className="font-medium text-gray-700">
                {comment.nickname}
              </span>
              <span className="text-gray-600">
                {comment.updated_at ? (
                  <>
                    <span>{formatDate(comment.created_at)}</span>{" "}
                    <span>수정됨</span>
                  </>
                ) : (
                  <span> {formatDate(comment.created_at)}</span>
                )}
              </span>
            </div>
            {comment.is_mine && (
              <ActionMenu
                targetId={comment.id}
                onEdit={handleEditComment}
                onDelete={() =>
                  openModal("DeleteModal", {
                    id: comment.id,
                    postId: comment.post,
                    type: "comment",
                  })
                }
              />
            )}

            <DeleteModal onDelete={handleDeleteComment} />
          </div>
          <p className="mt-2 text-gray-800 mb-4 text-md">{comment.content}</p>
        </>
      )}
    </div>
  );
}
