"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/common/Button";
import SelectBox from "@/components/common/SelectBox";
import {
  categoryOptions,
  interestOptions,
} from "@/constants/category";
import AreaDropdown from "../../_components/AreaDropdown";
import { Post, PostFormData, postSchema } from "@/types/post";
import { useEffect } from "react";
import ImageUploader from "./ImageUploader";

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
        },
  });

  const onValid = (newPost: PostFormData) => {
    console.log("form 제출", newPost);
    onSubmit(newPost);
  };

  // 기존 게시글이 없는 경우 데이터폼 초기화
  useEffect(() => {
    if (initialValue) {
      reset({
        title: initialValue.title,
        content: initialValue.content,
        category: initialValue.category ?? undefined,
        interest: initialValue.interest ?? undefined,
        area: initialValue.area ?? undefined,
      });
    }
  }, [initialValue, reset]);

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col w-full gap-6 my-10 mx-auto"
    >
      <div className="flex flex-wrap gap-4 w-full">
        <SelectBox
          value={watch("category")}
          options={categoryOptions}
          placeholder="카테고리"
          onChange={(e) => setValue("category", Number(e.target.value))}
        />
        {errors.category && (
          <span className="text-red-500 text-sm mt-1">
            {errors.category.message}
          </span>
        )}
        <SelectBox
          value={watch("interest")}
          options={interestOptions}
          placeholder="관심사"
          onChange={(e) => setValue("interest", Number(e.target.value))}
        />
        <AreaDropdown />
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

      <ImageUploader 
        setValue={setValue}
        control={control}
        initialFile={typeof initialValue?.file === "string" ? initialValue.file : undefined}
      />

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
