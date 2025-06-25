import React from "react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  password,
  setPassword,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  password: string;
  setPassword: (value: string) => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">비밀번호 확인</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          className="w-full border px-3 py-2 mb-4 rounded"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600">
            취소
          </button>
          <button onClick={onConfirm} className="text-red-500 font-bold">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
