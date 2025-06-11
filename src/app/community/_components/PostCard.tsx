import { Post } from "@/types/post";
import { formatDate } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PostMetaData from "./PostMetaData";
interface PostProps {
  post: Post;
}

export default function PostCard({ post }: PostProps) {
  return (
    <Link href={`/community/${post.post_id}`} className="block">
      <div className="p-8 border border-gray-400 rounded-md flex flex-col gap-4 relative">
        <PostMetaData
          post_id={post.post_id}
          category_id={post.category_id}
          interest_id={post.interest_id}
          area_id={post.area_id ?? null}
          digitalLevel_id={post.digitalLevel_id}
          is_author={post.is_author}
        />
        <h2 className="text-lg font-semibold">{post.title}</h2>
        {post.image_url && (
          <div className="relative h-[600px] w-full rounded-md overflow-hidden">
            <Image
              src={post.image_url}
              alt="게시물 이미지"
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
                <span>{formatDate(post.updated_at)}</span>{" "}
                <span>수정됨</span>
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
