'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { uploadFiles } from '@/apis/file';

interface MeetImageUploaderProps {
  setImageId: (id: number) => void;
}
export default function MeetImageUploader({ setImageId }: MeetImageUploaderProps) {
  const handleImageUpload = async (file: File) => {
    const response = await uploadFiles(file, 'meet');
    console.log('response id !!!!!!', response);
    return response;
  };
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleImageChange');
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      const response = await handleImageUpload(file);
      console.log('response id !!!!!!', response);
      setImageId(response.ids[0]);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-start mb-4">
      <label className="text-sm text-gray-700 font-medium">대표 이미지</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative w-full h-48 rounded-xl border border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
      >
        {previewUrl && previewUrl.trim() !== '' ? (
          <Image src={previewUrl} alt="미리보기" fill className="object-contain" />
        ) : (
          <span className="text-gray-500">이미지를 업로드하려면 클릭하세요</span>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
    </div>
  );
}
