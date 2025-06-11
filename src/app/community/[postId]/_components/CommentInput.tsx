import Button from "@/components/common/Button";
import { useEffect, useState } from "react";

interface CommentInputProps {
  initialValue?: string;
  onSubmit: (content: string) => void;
  mode?: "create" | "edit";
  onCancel?: () => void; // 수정 취소할 경우
}

export default function CommentInput({
  initialValue = "",
  onSubmit,
  mode = "create",
  onCancel,
}: CommentInputProps) {
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <div className="w-full mt-2 mb-4 h-[150px] flex flex-col items-end gap-2">
      <textarea
        placeholder="댓글을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-full pr-24 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
      />
      <div className="flex gap-2">
        {mode === "edit" && onCancel && (
          <Button
            color="gray"
            className="text-sm px-2 py-1"
            width="w-auto"
            onClick={onCancel}
          >
            취소
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          className="text-sm p-1"
          width="w-auto"
        >
          {mode === "edit" ? "수정" : "등록"}
        </Button>
      </div>
    </div>
  );
}
