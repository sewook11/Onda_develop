import { PostFile } from "@/types/file";
import Image from "next/image";
import React, { useState } from "react";
import DefaultImage from "../../_components/DefaultImage";

interface PostContentProps {
  content: string;
  file?: PostFile | null;
}

export default function PostContent({ content, file }: PostContentProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="space-y-2 w-full py-10 border-b-2 border-gray-400 min-h-[400px]">
      {file && (
        <div className="w-full h-[600px] relative shrink-0 rounded-md overflow-hidden">
          {!hasError ? (
            <Image
              src={file.file}
              alt={file.file_name ?? "게시물 이미지"}
              fill
              onError={() => setHasError(true)}
              className="object-cover rounded-md max-w-[600px] max-h-[600px] mx-auto"
            />
          ) : (
            <DefaultImage size="big" />
          )}
        </div>
      )}
      <div className="w-full py-4 text-md">{content}</div>
    </div>
  );
}
