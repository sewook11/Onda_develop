import { getComments, createComment, patchComment, deleteComment } from "@/apis/comments";
import { Comment, CommentCreatePayload, CommentsResponse, CommentUpdatePayload } from "@/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// 댓글 목록 조회 
export const useFetchComments = (postId: number, page: number) => {
  return useQuery<CommentsResponse, Error>({
    queryKey: ["comments", postId, page],
    queryFn: () => getComments(postId, page),
    enabled: !!postId,
  });
}

// 댓글 작성
export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation<Comment, Error, CommentCreatePayload>({
        mutationFn: createComment,
        onSuccess: (data) => {
            console.log("댓글 작성 성공", data);

            queryClient.invalidateQueries({ queryKey: ["comments", data.post] });
        },
        onError: (error) => {
            console.error("댓글 작성 실패: ", error.message);
        },
    });
}

// 댓글 수정
export const useUpdateComment = () => {
    const queryClient = useQueryClient();

    return useMutation<Comment, Error, CommentUpdatePayload>({
        mutationFn: ({ id, postId, content, parent }) =>  patchComment({ id, postId, content, parent }),
        onSuccess: (data) => {
            console.log("댓글 수정 성공", data);

            queryClient.invalidateQueries({ queryKey: ["comments", data.post] });
        },
        onError: (error) => {
            console.error("댓글 수정 실패: ", error.message);
        },
    });
}

// 댓글 삭제
export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { id: number; postId: number }>({
        mutationFn: ({ id, postId }) => {
            return deleteComment(id, postId);
        },
        onSuccess: (data, { postId }) => {
            console.log("댓글 삭제 성공", data);

            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
        onError: (error) => {
            console.error("댓글 삭제 실패: ", error.message);
        },
    });
}