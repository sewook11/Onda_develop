import { Post } from "@/types/post";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import PostMetaData from "./PostMetaData";
import DefaultImage from "./DefaultImage";
interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <Link href={`/community/${post.id}`} className="block">
      <div className="p-8 border border-gray-400 rounded-md flex flex-col gap-4 relative">
        {/* 상단 메타데이터 */}
        <PostMetaData
          options={{
            id: post.id,
            category: post.category,
            interest: post.interest,
            area: post.area,
          }}
          is_mine={post.is_mine}
          file={post.file ?? undefined}
        />

        {/* 하단 텍스트 + 이미지 */}
        <div className="flex justify-between items-center gap-6">
          {/* 왼쪽: 텍스트 내용 */}
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-md mb-2">{post.content}</p>
            <div className="flex gap-4 text-sm text-gray-600">
              <span>{post.nickname}</span>
              <div className="flex gap-4">
                {post.updated_at ? (
                  <>
                    <span>{formatDate(post.updated_at)}</span>
                    <span>수정됨</span>
                  </>
                ) : (
                  <span> {formatDate(post.created_at)}</span>
                )}
              </div>
            </div>
          </div>

          {/* 오른쪽: 이미지 */}
          {post.file && (
            <div className="w-[150px] h-[150px] relative shrink-0 rounded-md overflow-hidden">
              {!hasError ? (
                <Image
                  src={post.file.file}
                  alt={post.file.file_name ?? "게시물 이미지"}
                  fill
                  onError={() => setHasError(true)}
                  className="object-cover rounded-md"
                />
              ) : (
                <DefaultImage />
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
