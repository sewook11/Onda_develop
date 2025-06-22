// components/ProfileImageModal.tsx
"use client";

interface ProfileImageModalProps {
  onClose: () => void;
  onChange: () => void;
  onDelete: () => void;
}

export default function ProfileImageModal({
  onClose,
  onChange,
  onDelete,
}: ProfileImageModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg space-y-4 text-center">
        <p className="text-gray-800 font-semibold">
          프로필 사진을 어떻게 하시겠어요?
        </p>
        <div className="flex justify-between gap-2">
          <button
            className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            onClick={onChange}
          >
            변경
          </button>
          <button
            className="flex-1 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded"
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
        <button
          onClick={onClose}
          className="text-base text-gray-500 hover:underline"
        >
          취소
        </button>
      </div>
    </div>
  );
}
