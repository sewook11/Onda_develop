type Props = {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: () => void;
};

const FinalConfirmModal = ({ isOpen, onClose, onWithdraw }: Props) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">정말 탈퇴하시겠습니까?</h2>
        <p className="mb-4 text-sm text-gray-600">
          탈퇴 시 모든 정보가 삭제됩니다.
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600">
            취소
          </button>
          <button onClick={onWithdraw} className="text-red-500 font-bold">
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalConfirmModal;
