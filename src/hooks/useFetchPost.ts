import { dummyPosts } from "@/datas/dummyPosts";
import { Post } from "@/types/post";
import { useMemo } from "react";

export function useFetchPost(postId: number | undefined) {
  const post = useMemo<Post | undefined>(() => {
    if (!postId) return undefined;

    const foundPost = dummyPosts.find((p) => p.post_id === postId);
    if (!foundPost) return undefined;

    return {
      ...foundPost,
      image_url: foundPost.image_url ?? undefined,
      created_at: new Date(foundPost.created_at),
      updated_at: foundPost.updated_at
        ? new Date(foundPost.updated_at)
        : undefined,
    };
  }, [postId]);

  return { post };
}
