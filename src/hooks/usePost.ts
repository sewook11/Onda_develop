import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/post";
import {
  deletePost,
  getPost,
  getPosts,
  patchPost,
  postCreate,
  PostCreatePayload,
  PostCreateResponse,
  PostsResponse,
} from "@/apis/post";

// 게시글 상세 조회
export const useFetchPost = (id: number) => {
  return useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });
};

// 게시글 목록 조회
export const useFetchPostList = (page: number) => {
  return useQuery<PostsResponse>({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page),
  });
};

// 게시글 생성
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<PostCreateResponse, Error, PostCreatePayload>({
    mutationFn: postCreate,
    onSuccess: (data) => {
      console.log("게시글 생성 성공", data);

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.id] });
    },
    onError: (error) => {
      console.error("게시글 생성 실패: ", error.message);
    },
  });
};

// 게시글 수정
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Post,
    Error,
    { postId: number; payload: PostCreatePayload }
  >({
    mutationFn: ({ postId, payload }) => patchPost(postId, payload),
    onSuccess: (data, { postId }) => {
      console.log("게시글 수정 성공", data);

      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("게시글 수정 실패: ", error.message);
    },
  });
};

// 게시글 삭제
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { postId: number }>({
    mutationFn: ({ postId }) => deletePost(postId),
    onSuccess: (_, { postId }) => {
      console.log("게시글 삭제 성공");

      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("게시글 삭제 실패: ", error.message);
    },
  });
};
