import { FileData } from "@/types/file";
import Image from "next/image";
import React from "react";

interface PostContentProps {
  content: string;
  file?: FileData | null;
}

export default function PostContent({ content, file }: PostContentProps) {
  return (
    <div className="space-y-2 w-full py-10 border-b-2 border-gray-400 min-h-[400px]">
      {file && (
        <div className="relative w-full h-[600px] mb-4">
          <Image
            src={file.file_url}
            alt={file.file_name ?? "게시물 이미지"}
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
