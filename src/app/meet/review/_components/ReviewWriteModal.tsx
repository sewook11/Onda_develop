import Modal from "@/components/common/Modal";
import { useState } from "react";
import { Star } from "lucide-react";
import Button from "@/components/common/Button";

interface ReviewWriteModalProps {
  modalKey: string;
  onClose: () => void;
  onSubmit: (rating: number, content: string) => void;
}

export default function ReviewWriteModal({ modalKey, onClose, onSubmit }: ReviewWriteModalProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (rating === 0 || content.trim() === "") return;
    onSubmit(rating, content);
    onClose();
  };

  return (
    <Modal modalKey={modalKey} className="max-w-md w-1/2 rounded-2xl bg-white p-6 shadow-xl font-sans">
      <h2 className="text-lg font-bold mb-2 text-main">모임 후기 작성</h2>
      <p className="text-sm text-gray-500 mb-4">별의 갯수로 모임의 만족도를 알려주세요</p>

      {/* 별점 */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-6 h-6 cursor-pointer ${i <= rating ? "text-primary" : "text-gray-300"}`}
            fill={i <= rating ? "currentColor" : "none"}
            onClick={() => setRating(i)}
          />
        ))}
      </div>

      {/* 후기 입력 */}
      <textarea
        className="w-full h-28 p-3 border border-gray-300 rounded-md text-sm text-gray-800 resize-none mb-4"
        placeholder="후기를 작성해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* 작성 완료 버튼 */}
      <div className="text-right">
        <Button
          color="primary"
          variant="fill"
          width="w-auto"
          height="h-10"
          className="px-4"
          onClick={handleSubmit}
        >
          작성완료
        </Button>
      </div>
    </Modal>
  );
}
