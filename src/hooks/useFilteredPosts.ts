import { SearchParams } from "@/stores/useAppSearchParams";
import { useFetchPostList } from "./usePost";
import { useMemo } from "react";
import { Post } from "@/types/post";

export function useFilteredPosts(searchParams: SearchParams, page: number) {
  const { data, isLoading } = useFetchPostList(page);

  const hasFilter =
    searchParams.category ||
    searchParams.interest ||
    searchParams.area?.childId ||
    searchParams.keyword;

  const filtered = useMemo<Post[]>(() => {
    const posts = data?.results ?? [];
    if (!hasFilter) return posts;

    return posts.filter((post) => {
      const filteredCategory =
        !searchParams.category || post.category === searchParams.category;

      const filteredInterest =
        !searchParams.interest || post.interest === searchParams.interest;

      const filteredArea =
        !searchParams.area?.childId || post.area === searchParams.area.childId;

      const filteredKeyword =
        !searchParams.keyword || post.title.includes(searchParams.keyword);

      return (
        filteredCategory &&
        filteredInterest &&
        filteredArea &&
        filteredKeyword
      );
    });
  }, [data, searchParams, hasFilter]);

  return { posts: filtered, isLoading, totalCount: data?.count ?? 0 };
}
