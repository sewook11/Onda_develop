"use client";

import React, { useRef, useState } from "react";

export default function MeetImageUploader() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-start mb-4">
      <label className="text-sm text-gray-700 font-medium">대표 이미지</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-full h-48 rounded-xl border border-dashed border-gray-300 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="미리보기" className="h-full object-contain" />
        ) : (
          <span className="text-gray-500">이미지를 업로드하려면 클릭하세요</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}
