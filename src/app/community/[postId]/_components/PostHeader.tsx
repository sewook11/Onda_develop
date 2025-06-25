import { PostAuthor, PostIds } from "@/types/post";
import PostMetaData from "../../_components/PostMetaData";
import { formatDate } from "@/utils/utils";

interface PostHeaderProps {
  ids: PostIds;
  author: PostAuthor;
  title: string;
}

export default function PostHeader({ ids, author, title }: PostHeaderProps) {
  return (
    <div className="space-y-2 w-full py-10 border-b-2 border-gray-400">
      <PostMetaData ids={ids} is_mine={author.is_mine} />
      <h1 className="font-semibold py-4 text-xl">{title}</h1>
      <div className="flex gap-4 text-sm text-gray-600">
        <span>{author.nickname}</span>
        <div className="flex gap-4">
          {author.updated_at ? (
            <>
              <span>{formatDate(author.updated_at)}</span> <span>수정됨</span>
            </>
          ) : (
            <span> {formatDate(author.created_at)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
