"use client";
import { Edit, MoreVertical, Trash } from "lucide-react";
import React, { useState } from "react";

interface PostActionMenuProps {
  postId: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function PostActionMenu({
  postId,
  onEdit,
  onDelete,
}: PostActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(postId);
    setIsOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(postId);
    setIsOpen(false);
  };
  return (
    <div>
      <button onClick={handleToggle}>
        <MoreVertical />
      </button>
      {isOpen && (
        <div className="bg-white p-4 flex flex-col gap-4 rounded-md text-sm absolute z-10 border border-gray-400 shadow-md right-5">
          <button onClick={handleEdit} className="flex gap-2">
            <Edit />
            수정
          </button>
          <button onClick={handleDelete} className="flex gap-2 text-accent-red">
            <Trash />
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
