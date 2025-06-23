'use client';

import { useState } from 'react';
import { Paperclip, X } from 'lucide-react';
import { useUploadFile, useDeleteFiles } from '@/hooks/useFiles';
import { CertificationRequest } from '@/types/leader';

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export type CategoryFile = Partial<CertificationRequest> & {
  name?: string;
  size?: number;
  isUploading?: boolean;
};

type MultiCategoryFileUploadProps = {
  initialItems?: CertificationRequest[];
  onChange?: (items: CertificationRequest[]) => void;
};

const categories = ['경력증명서', '자격증', '지역 활동 내역', '기타'];

const MultiCategoryFileUpload = ({
  initialItems = [],
  onChange,
}: MultiCategoryFileUploadProps) => {
  const [items, setItems] = useState<CategoryFile[]>(
    initialItems.length > 0 ? initialItems : [{ certificate_type: '', file: undefined }]
  );

  const upload = useUploadFile();
  const deleteFile = useDeleteFiles();

  const extractCertificationRequest = (data: CategoryFile[]): CertificationRequest[] => {
    return data
      .filter((item): item is CertificationRequest =>
        !!item.certificate_type && typeof item.file === 'number'
      )
      .map(({ certificate_type, file }) => ({ certificate_type, file }));
  };

  const updateItems = (newItems: CategoryFile[]) => {
    setItems(newItems);
    const completeItems = extractCertificationRequest(newItems);
    onChange?.(completeItems);
  };

  const handleAddItem = () => {
    const newItems = [...items, { certificate_type: '', file: undefined }];
    updateItems(newItems);
  };

  const handleCategoryChange = (index: number, value: string) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, certificate_type: value } : item
    );
    updateItems(newItems);
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;

    const fileName = file.name;
    const fileSize = file.size;

    const uploadingItems = [...items];
    uploadingItems[index] = {
      ...uploadingItems[index],
      isUploading: true,
      name: fileName,
      size: fileSize,
    };
    setItems(uploadingItems);

    upload.mutate(
      { file, category: 'certificate' },
      {
        onSuccess: (data) => {
          const updatedItems = [...uploadingItems];
          updatedItems[index] = {
            ...updatedItems[index],
            file: data.ids?.[0],
            isUploading: false,
          };
          setItems(updatedItems);
          updateItems(updatedItems);
        },
        onError: (error) => {
          console.error('업로드 실패:', error);
          alert('파일 업로드 실패');
          const revertedItems = [...uploadingItems];
          revertedItems[index] = {
            ...revertedItems[index],
            isUploading: false,
          };
          setItems(revertedItems);
        },
      }
    );
  };

  const handleRemove = (index: number) => {
    const target = items[index];
    if (items.length === 1) {
      alert('최소 1개의 항목은 필요합니다.');
      return;
    }

    if (target.file != null) {
      deleteFile.mutate([target.file]);
    }

    const newItems = items.filter((_, i) => i !== index);
    updateItems(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">
          증빙서류 <span className="text-xs">(파일 제출 필수)</span>
        </h2>
        <button
          onClick={handleAddItem}
          className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition"
        >
          + 항목 추가
        </button>
      </div>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col px-3 py-2 sm:flex-row sm:items-center sm:justify-between border bg-white"
        >
          <div className="flex-1 space-y-2 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center">
            <div className="w-full sm:w-60">
              <select
                value={item.certificate_type || ''}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="w-full px-2 py-1 text-sm"
                disabled={item.file != null}
              >
                <option value="">항목 선택</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              {item.isUploading ? (
                <div className="text-sm text-blue-500">업로드 중...</div>
              ) : item.file != null ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-700 space-x-2">
                    <Paperclip size={20} strokeWidth={2.5} />
                    <span className="text-sm">
                      {item.name} ({formatBytes(item.size || 0)})
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                  className="text-sm"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiCategoryFileUpload;
