'use client';

import { useState } from 'react';
import { Paperclip, X } from 'lucide-react';

type CategoryFile = {
  category: string;
  file: File | string | null;
};

type MultiCategoryFileUploadProps = {
  readonly?: boolean;
  initialItems?: CategoryFile[];
};

const categories = ['경력증명서', '자격증', '지역 활동 내역', '기타'];

const MultiCategoryFileUpload = ({
  readonly = false,
  initialItems = [],
}: MultiCategoryFileUploadProps) => {
  const [items, setItems] = useState<CategoryFile[]>(initialItems);

  const handleAddItem = () => {
    if (readonly) return;
    setItems((prev) => [...prev, { category: '', file: null }]);
  };

  const handleCategoryChange = (index: number, value: string) => {
    if (readonly) return;
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, category: value } : item))
    );
  };

  const handleFileChange = (index: number, file: File | null) => {
    if (readonly) return;
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, file } : item))
    );
  };

  const handleRemove = (index: number) => {
    if (readonly) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className='flex justify-between items-center'>
        {readonly? (
          <h2 className="text-xl">증빙서류 제출 내역</h2>
          ):(
          <h2 className="text-xl">증빙서류<span className='text-xs'>(파일 제출 필수)</span></h2>
        )}
        {!readonly && (
          <button
            onClick={handleAddItem}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition"
          >
            + 항목 추가
          </button>
        )}
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col px-3 py-2 sm:flex-row sm:items-center sm:justify-between border ${
            readonly ? 'bg-gray-100' : 'bg-white'
          }`}
        >
          <div className="flex-1 space-y-2 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center">
            <div className="w-full sm:w-60">
              <select
                value={item.category}
                disabled={readonly}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="w-full px-2 py-1 text-sm disabled:bg-gray-200"
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
              {readonly ? (
                item.file ? (
                  typeof item.file === 'string' ? (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-700 underline"
                    >
                      <Paperclip size={20} strokeWidth={2.5} />
                      <span className="text-sm truncate max-w-[180px]">
                        {item.file.split('/').pop()}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Paperclip size={20} strokeWidth={2.5} />
                      <span className="text-sm truncate max-w-[180px]">{item.file.name}</span>
                    </div>
                  )
                ) : (
                  <span className="text-sm text-gray-400">- 업로드된 파일 없음 -</span>
                )
              ) : (
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(index, e.target.files ? e.target.files[0] : null)
                  }
                  className="text-sm"
                />
              )}
            </div>
          </div>

          {!readonly && (
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-600 flex items-center text-sm mt-1 sm:mt-0"
            >
              <X size={20} strokeWidth={2.5} className="mr-1" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MultiCategoryFileUpload;
