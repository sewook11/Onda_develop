import { Post } from "@/types/post";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostMetaData from "./PostMetaData";
import { FileData } from "@/types/file";
interface PostProps {
  post: Post;
  file?: FileData | null;
}

export default function PostCard({ post, file }: PostProps) {
  return (
    <Link href={`/community/${post.id}`} className="block">
      <div className="p-8 border border-gray-400 rounded-md flex flex-col gap-4 relative">
        <PostMetaData
          ids={{
            id: post.id,
            category: post.category,
            interest: post.interest,
            area: post.area,
          }}
          is_mine={post.is_mine}
        />
        <h2 className="text-lg font-semibold">{post.title}</h2>
        {file && (
          <div className="relative h-[600px] w-full rounded-md overflow-hidden">
            <Image
              src={file.file_url}
              alt={file.file_name ?? "게시물 이미지"}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="text-md mb-2">{post.content}</p>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>{post.nickname}</span>
          <div className="flex gap-4">
            {post.updated_at ? (
              <>
                <span>{formatDate(post.updated_at)}</span> <span>수정됨</span>
              </>
            ) : (
              <span> {formatDate(post.created_at)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
