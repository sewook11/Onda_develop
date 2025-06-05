import React from "react";
import PostCard from "./PostCard";
import { useAppSearchParams } from "@/stores/useAppSearchParams";
import { useFilteredPosts } from "@/hooks/useFilteredPosts";

export default function PostList() {
  const {searchParams} = useAppSearchParams();
  const {posts} = useFilteredPosts(searchParams);

  return (
    <div className="flex flex-col gap-4 w-full">
{posts.map((post) => (
  <PostCard
    key={post.post_id}
    post={{
      ...post,
      image_url: post.image_url ?? undefined, 
    }}
  />
))}
    </div>
  );
}
