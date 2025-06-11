import { PostContentProps } from "@/types/post";
import Image from "next/image";
import React from "react";

export default function PostContent({ image, content }: PostContentProps) {

  return (
    <div className="space-y-2 w-full py-10 border-b-2 border-gray-400 min-h-[400px]">
      {image && (
        <div className="relative w-full h-[600px] mb-4">
          <Image
            src={image}
            alt="게시글 이미지"
            fill
            className="object-cover rounded-lg"
            sizes="100%"
          />
        </div>
      )}
      <div className="w-full py-4 text-md">{content}</div>
    </div>
  );
}
