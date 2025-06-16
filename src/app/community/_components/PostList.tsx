import React from "react";
import PostCard from "./PostCard";
import { PostWithFile } from "@/types/post";

interface PostListProps {
  posts: PostWithFile[];
}

export default function PostList({posts} : PostListProps) {

  return (
    <div className="flex flex-col gap-4 w-full">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          file={post.fileData}
        />
      ))}
    </div>
  );
}

