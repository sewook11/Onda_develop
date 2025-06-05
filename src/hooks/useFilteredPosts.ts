import { dummyPosts } from "@/datas/dummyPosts";
import { SearchParams } from "@/stores/useAppSearchParams";
import { Post } from "@/types/post";
import { useMemo } from "react";

export function useFilteredPosts(searchParams: SearchParams) {
  const filtered = useMemo<Post[]>(() => {
    return dummyPosts
      .filter((post) => {
        const filteredCategory =
          !searchParams.category_id ||
          post.category_id === searchParams.category_id;
        const filteredInterest =
          !searchParams.interest_id ||
          post.interest_id === searchParams.interest_id;
        const filteredDigitalLevel =
          !searchParams.digitalLevel_id ||
          post.digitalLevel_id === searchParams.digitalLevel_id;
        //   const filteredSido = !searchParams.sido || post.sido === searchParams.sido;
        //   const filteredDistricts = !searchParams.districts || post.districts === searchParams.districts;
        const filteredKeyword =
          !searchParams.keyword || post.title.includes(searchParams.keyword);

        return (
          filteredCategory &&
          filteredInterest &&
          filteredDigitalLevel &&
          // filteredSido &&
          // filteredDistricts &&
          filteredKeyword
        );
      })
      .map((post) => ({
        ...post,
        image_url: post.image_url ?? undefined,
        created_at: new Date(post.created_at),
        updated_at: post.updated_at ? new Date(post.updated_at) : undefined,
      }));
  }, [searchParams]);

  return { posts: filtered };
}
