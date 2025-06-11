"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";
import SelectBox from "@/components/common/SelectBox";
import {
  categoryOptions,
  digitalLevelOptions,
  interestOptions,
} from "@/constants/category";
import AreaDropdown from "../../_components/AreaDropdown";
import { Post, PostFormData, postSchema } from "@/types/post";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PostFormProps {
  initialValue?: Post;
  onSubmit: (newPost: PostFormData) => void;
  mode?: "create" | "edit";
  onCancel?: () => void;
}

export default function PostForm({
  initialValue,
  onSubmit,
  mode = "create",
  onCancel,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialValue
      ? undefined // 실제 값은 reset으로 대체됨
      : {
          title: "",
          content: "",
          category_id: 0,
          interest_id: 0,
          digitalLevel_id: 0,
          //   area_id: "",
        },
  });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onValid = (newPost: PostFormData) => {
    console.log("form 제출", newPost);
    onSubmit(newPost);
  };

  const imageFile = useWatch({ name: "images", control });

  // 기존 게시글이 없는 경우 데이터폼 초기화
  useEffect(() => {
    if (initialValue) {
      reset({
        title: initialValue.title,
        content: initialValue.content,
        category_id: initialValue.category_id ?? 0,
        interest_id: initialValue.interest_id ?? 0,
        digitalLevel_id: initialValue.digitalLevel_id ?? 0,
        // area_id: initialValue.area_id?.toString() ?? "",
      });

      if (typeof initialValue.image_url === "string") {
        setPreviewUrls([initialValue.image_url]);
      }
    }
  }, [initialValue, reset]);

  // 이미지 미리보기
  useEffect(() => {
    if (imageFile instanceof File) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrls([url]);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (typeof imageFile === "string") {
      setPreviewUrls([imageFile]);
    } else {
      setPreviewUrls([]);
    }
  }, [imageFile]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col w-full gap-6 my-10 mx-auto"
    >
      <div className="flex flex-wrap gap-4 w-full">
        <SelectBox
          value={watch("category_id")}
          options={categoryOptions}
          placeholder="카테고리"
          onChange={(e) => setValue("category_id", Number(e.target.value))}
        />
        {errors.category_id && (
          <span className="text-red-500 text-sm mt-1">
            {errors.category_id.message}
          </span>
        )}
        <SelectBox
          value={watch("interest_id")}
          options={interestOptions}
          placeholder="관심사"
          onChange={(e) => setValue("interest_id", Number(e.target.value))}
        />
        {errors.interest_id && (
          <span className="text-red-500 text-sm mt-1">
            {errors.interest_id.message}
          </span>
        )}
        <AreaDropdown />
        <SelectBox
          value={watch("digitalLevel_id")}
          options={digitalLevelOptions}
          placeholder="디지털 난이도"
          onChange={(e) => setValue("digitalLevel_id", Number(e.target.value))}
        />
        {errors.digitalLevel_id && (
          <span className="text-red-500 text-sm mt-1">
            {errors.digitalLevel_id.message}
          </span>
        )}
      </div>

      <input
        {...register("title")}
        placeholder={errors.title?.message || "제목을 입력하세요"}
        className={`w-full border-b p-4 text-lg rounded-md placeholder-gray-500 text-main focus:outline-none focus:ring-2 focus:ring-primary-deep ${
          errors.title && "placeholder-red-500"
        }`}
      />

      <textarea
        {...register("content")}
        placeholder={errors.content?.message || "내용을 입력해주세요"}
        className={`w-full min-h-[300px] rounded-md text-md p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary-deep ${
          errors.content && "placeholder-red-500"
        }`}
      />
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
          {...register("images")}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            if (!file) return;
            setValue("images", file);
            setPreviewUrls([URL.createObjectURL(file)]);
          }}
        />
        {errors.images && (
          <span className="text-red-500 text-sm">{errors.images.message}</span>
        )}
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
                onClick={onCancel}
                className="text-accent-red text-sm p-2 rounded-lg hover:bg-red-100 active:bg-red-200"
              >
                삭제
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 justify-center w-full">
        {mode === "edit" && onCancel && (
          <Button
            color="gray"
            width="w-[200px]"
            onClick={onCancel}
            type="button"
          >
            취소
          </Button>
        )}
        <Button type="submit" width="w-[200px]">
          {mode === "edit" ? "수정 완료" : "등록"}
        </Button>
      </div>
    </form>
  );
}
