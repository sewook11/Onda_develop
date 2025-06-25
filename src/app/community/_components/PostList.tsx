import React from "react";
import PostCard from "./PostCard";
import { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
}

export default function PostList({posts} : PostListProps) {

  return (
    <div className="flex flex-col gap-4 w-full">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}