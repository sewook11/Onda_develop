import { END_POINT } from "@/constants/route";
import api from "./app";
import { Comment, CommentCreatePayload, CommentsResponse, CommentUpdatePayload } from "@/types/post";

// 게시글 댓글 목록 조회
export const getComments = async (post: number, page: number) => {
  const response = await api.get<CommentsResponse>(`${END_POINT.COMMENTS(post)}?page=${page}`);
  console.log(`${post} 게시글 댓글 목록`, response.data);

  return response.data;
}

// 게시글 댓글 작성
export const createComment = async ({postId, content, parent} : CommentCreatePayload) => {
  const payload = {content, parent};
  
  // parent가 있는 경우 대댓글 작성
  if (parent) payload.parent = parent;

  const response = await api.post<Comment>(END_POINT.COMMENTS(postId), payload);
  console.log(`${postId} 게시글 댓글 작성`, response.data);

  return response.data;
}

// 게시글 댓글 상세 조회
export const getComment = async (id: number, postId: number) => {
    const response = await api.get<Comment>(END_POINT.COMMENTS_DETAIL(postId, id));
    console.log(`${postId} 게시글 ${id} 댓글`, response.data);
    
    return response.data;
}

// 게시글 댓글 수정
export const patchComment = async ({id, postId, content, parent} : CommentUpdatePayload) => {
  const payload = { content, parent };
  const response = await api.patch<Comment>(END_POINT.COMMENTS_DETAIL(postId, id), payload);
  console.log(`${postId} 게시글 ${id} 댓글 수정`, response.data);
  return response.data;
}

// 게시글 댓글 삭제
export const deleteComment = async (id: number, postId: number) => {
  const response = await api.delete(END_POINT.COMMENTS_DETAIL(postId, id));
  console.log(`${postId} 게시글 ${id} 댓글 삭제`, response.data);
  return response.data;
}