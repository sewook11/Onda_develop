import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Control,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { PostFormData } from "@/types/post";

interface ImageUploaderProps {
  setValue: UseFormSetValue<PostFormData>;
  control: Control<PostFormData>;
  initialFile?: string;
}

export default function ImageUploader({
  setValue,
  control,
  initialFile,
}: ImageUploaderProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const imageFile = useWatch({ name: "file", control });

  // 이미지 미리보기
  useEffect(() => {
    if (imageFile && initialFile) {
      setPreviewUrls([initialFile]);
    }
  }, [imageFile, initialFile]);


  return (
    <div>
      {/* 이미지 업로드 영역 */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="images"
          className={`cursor-pointer w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-primary-deep transition
            ${previewUrls.length > 0 && "hidden"}`}
        >
          <span className="text-sm">이미지를 클릭하거나 드래그하세요</span>
          <span className="text-xs">(최대 1장)</span>
        </label>

        <input
          id="images"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            if (!file) return;
            setValue("file", file);
            setPreviewUrls([URL.createObjectURL(file)]);
          }}
        />
        {previewUrls.length > 0 && imageFile && (
          <div className="flex flex-col gap-2 border-2 border-dashed p-4 rounded-lg hover:border-primary-deep transition">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <Image
                  src={previewUrls[0]}
                  alt="업로드된 이미지"
                  width={100}
                  height={100}
                  style={{ width: 100, height: 100 }}
                  className="rounded-lg object-cover mt-2"
                />
                {imageFile instanceof File && (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">
                      {imageFile.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setValue("file", undefined);
                  setPreviewUrls([]);
                }}
                className="text-accent-red text-sm p-2 rounded-lg hover:bg-red-100 active:bg-red-200"
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
