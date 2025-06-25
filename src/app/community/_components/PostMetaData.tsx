import { HeartIcon, MapPin } from "lucide-react";
import ActionMenu from "./ActionMenu";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";
import DeleteModal, { DeleteModalData } from "./DeleteModal";
import { useDeletePost } from "@/hooks/usePost";
import { PostOptions } from "@/types/post";
import { useDeleteFile } from "@/hooks/useFile";
import { PostFile } from "@/types/file";

interface PostMetadataProps {
  options: PostOptions;
  is_mine: boolean;
  file?: PostFile;
}

export default function PostMetaData({
  options,
  is_mine,
  file,
}: PostMetadataProps) {
  const router = useRouter();

  const { openModal } = useModalStore();

  const { mutate: deletePost } = useDeletePost();
  const { mutate: deleteFile } = useDeleteFile();

  const handleEdit = (id: number) => {
    router.push(`/community/${id}/edit`);
  };

  const handleDelete = (data: DeleteModalData) => {
    if (data.type === "post" && typeof data.id === "number") {
      try {
        if (file) {
          deleteFile([file.id]);
          console.log("사진 삭제 성공");
        }
        deletePost(
          { postId: data.id },
          {
            onSuccess: () => {
              console.log("게시글 삭제 성공");
              router.push("/community");
            },
            onError: (error) => {
              console.error("게시글 삭제 실패:", error.message);
              openModal("PostFailModal", {
                message: "게시글 삭제에 실패했습니다.",
              });
            },
          }
        );
      } catch (e) {
        console.error("파일 삭제 중 오류 발생:", e);
      }
    }
  };

  return (
    <div className="flex justify-between relative text-gray-600 text-sm">
      <div className="flex gap-4">
        <span className="font-medium">{options?.category.name}</span>
        {options?.interest && (
          <span className="ml-2 flex items-center gap-1">
            <HeartIcon />
            {options.interest.name}
          </span>
        )}
        {options?.area && (
          <span className="flex gap-2 items-center">
            <MapPin />
            <span>{options.area.name}</span>
          </span>
        )}
      </div>
      {is_mine && (
        <ActionMenu
          targetId={options?.id}
          onEdit={handleEdit}
          onDelete={() =>
            openModal("DeleteModal", { id: options.id, type: "post" })
          }
        />
      )}
      <DeleteModal onDelete={handleDelete} />
    </div>
  );
}
