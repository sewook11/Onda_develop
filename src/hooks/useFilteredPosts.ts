import { SearchParams } from "@/stores/useAppSearchParams";
import { useFetchPostList } from "./usePost";
import { useMemo } from "react";
import { Post } from "@/types/post";

export function useFilteredPosts(searchParams: SearchParams, page: number) {
  const { data, isLoading } = useFetchPostList(page);

  const hasFilter =
    !!searchParams.category?.id ||
    !!searchParams.interest?.id ||
    !!searchParams.area?.parentId?.id ||
    !!searchParams.area?.childId?.id ||
    !!searchParams.keyword?.trim();

  const filtered = useMemo<Post[]>(() => {
    const posts = data?.results ?? [];
    if (!hasFilter) return posts;

    return posts.filter((post) => {
      const filteredCategory =
        searchParams.category?.id === 0 ||
        post.category.id === searchParams.category.id;

      const filteredInterest =
        searchParams.interest?.id === 0 ||
        post.interest?.id === searchParams.interest.id;

      const filteredArea = searchParams.area?.childId?.id
        ? post.area?.id === searchParams.area.childId.id
        : searchParams.area?.parentId?.id
          ? post.area?.id === searchParams.area.parentId.id
          : true;

      const filteredKeyword =
        !searchParams.keyword || post.title.includes(searchParams.keyword);

      return (
        filteredCategory && filteredInterest && filteredArea && filteredKeyword
      );
    });
  }, [data, searchParams, hasFilter]);

  return { posts: filtered, isLoading, totalCount: data?.count ?? 0 };
}
