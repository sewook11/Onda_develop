import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useFormContext,
  UseFormSetValue,
  Control,
  useWatch,
} from "react-hook-form";
import { PostFormData } from "./PostForm";
import { PostFile } from "@/types/file";
import { deleteFiles } from "@/apis/file";
import DefaultImage from "../../_components/DefaultImage";

interface ImageUploaderProps {
  setValue: UseFormSetValue<PostFormData>;
  control: Control<PostFormData>;
  initialFile?: PostFile; // 초기 이미지 파일
}

export default function ImageUploader({
  setValue,
  control,
  initialFile,
}: ImageUploaderProps) {
  const { register } = useFormContext<PostFormData>();

  const imageFile = useWatch({ name: "file", control });
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let preview: string | null = null;

    if (imageFile instanceof File) {
      preview = URL.createObjectURL(imageFile);
      setPreviewUrls([preview]);
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [imageFile]);

  useEffect(() => {
    if (!imageFile && initialFile) {
      setPreviewUrls([initialFile.file]);
    }
  }, [initialFile, imageFile]);

  const renderFileInfo = () => {
    if (imageFile instanceof File) {
      return (
        <>
          <span className="text-sm font-medium text-gray-700">
            {imageFile.name}
          </span>
          <span className="text-xs text-gray-500">
            {(imageFile.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </>
      );
    }

    if (initialFile) {
      return (
        <>
          <span className="text-sm font-medium text-gray-700">
            {initialFile.file_name}
          </span>
          <span className="text-xs text-gray-500">
            {initialFile.file_size &&
              (initialFile.file_size / 1024 / 1024).toFixed(2)}
            MB
          </span>
        </>
      );
    }

    return null;
  };

  // 초기 이미지 삭제 함수
  const handleDeleteImage = async () => {
    // 초기 이미지 있는 경우
    if (!imageFile && initialFile) {
      try {
        await deleteFiles([initialFile.id]);
        setValue("file", undefined);
        setPreviewUrls([]);
      } catch (error) {
        console.error("이미지 삭제 실패:", error);
      }
      return;
    }

    // 현재 이미지가 파일인 경우
    setValue("file", undefined);
    setPreviewUrls([]);
  };

  return (
    <div>
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
          {...register("file")}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            if (!file) return;
            setValue("file", file);
          }}
        />

        {previewUrls.length > 0 && (
          <div className="flex flex-col gap-2 border-2 border-dashed p-4 rounded-lg hover:border-primary-deep transition">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                {!hasError ? (
                  <Image
                    src={previewUrls[0]}
                    alt="업로드된 이미지"
                    width={150}
                    height={150}
                    style={{ width: 100, height: 100 }}
                    className="rounded-lg object-cover mt-2"
                    onError={() => setHasError(true)}
                  />
                ) : (
                  <DefaultImage />
                )}
                <div className="flex flex-col gap-2">{renderFileInfo()}</div>
              </div>
              <button
                type="button"
                onClick={handleDeleteImage}
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
