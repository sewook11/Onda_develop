"use client";
import React, { useEffect, useState } from "react";
import PostSearch from "./_components/PostSearch";
import PostList from "./_components/PostList";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import { useAppSearchParams } from "@/stores/useAppSearchParams";
import { useFilteredPosts } from "@/hooks/useFilteredPosts";
import { useAuthStore } from "@/stores/useAuth";
import { useModalStore } from "@/stores/useModalStore";
import { LoginRequiredModal } from "./write/_components/PostModal";

export default function PostListPage() {
  // 게시글 데이터 및 페이지네이션
  const { searchParams } = useAppSearchParams();
  const { posts } = useFilteredPosts(searchParams);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const { accessToken } = useAuthStore();
  const access = accessToken;

    const { openModal } = useModalStore();

  useEffect(() => {
    const postsPerPage = 5;
    const pageCount = Math.ceil(posts.length / postsPerPage);
    setTotalPages(pageCount);
  }, [posts]);

  const handleClick = () => {
    if (!access) {
      openModal("LoginRequiredModal")
    } else {
      router.push("/community/write");
    }
  };

  return (
    <div className="flex flex-col items-center w-full my-20 max-w-[1440px] px-4 md:px-[160px] mx-auto">
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold text-left w-full">게시판</h1>
        <Button onClick={handleClick}>글쓰기</Button>
      </div>
      <PostSearch />
      <section className="w-full my-10">
        <PostList posts={posts} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </section>
      <LoginRequiredModal />
    </div>
  );
}
