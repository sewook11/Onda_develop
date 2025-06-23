'use client';

import { Certification } from '@/types/leader';
import { Paperclip } from 'lucide-react';

type CategoryFileListProps = {
  items: Certification[];
};

const CategoryFileList = ({ items }: CategoryFileListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl">증빙서류 제출 내역</h2>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500">제출된 서류가 없습니다.</p>
      ) : (
        items.map((item, index) => {
          const rawFileName = item.file_url.split('/').pop()?.split('?')[0] || '';
          const decodedFileName = decodeURIComponent(rawFileName);

          return (
            <div
              key={index}
              className="flex flex-col px-3 py-3 sm:flex-row sm:items-center sm:justify-between border bg-gray-100"
            >
              <div className="flex-1 space-y-2 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center">
                {/* 카테고리 */}
                <div className="w-full sm:w-60 text-sm font-medium text-gray-700">
                  {item.certificate_type || '-'}
                </div>

                {/* 파일 */}
                <div className="flex-1">
                  <a
                    href={item.file_url}
                    download={decodedFileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-700 underline"
                  >
                    <Paperclip size={20} strokeWidth={2.5} />
                    <span className="text-sm truncate block">
                      {decodedFileName}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CategoryFileList;
