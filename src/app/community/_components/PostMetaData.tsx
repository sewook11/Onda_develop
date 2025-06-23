import { HeartIcon, MapPin } from "lucide-react";
import ActionMenu from "./ActionMenu";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";
import DeleteModal, { DeleteModalData } from "./DeleteModal";
import { PostIds } from "@/types/post";
import useOptions from "@/hooks/useOptions";
import { useAuthStore } from "@/stores/useAuth";
import { useDeletePost } from "@/hooks/usePost";

interface PostMetadataProps {
  ids: PostIds;
  is_mine: boolean;
}

export default function PostMetaData({ ids, is_mine }: PostMetadataProps) {
  const router = useRouter();

  const { openModal } = useModalStore();

  const isAdmin = useAuthStore((state) => state.user?.role === "admin");

  const { mutate: deletePost } = useDeletePost();

  const { categoryOptions, interestOptions, areaOptions } = useOptions();
  const categoryName = categoryOptions.find(
    (c) => c.value === ids.category
  )?.label;
  const interestName = interestOptions.find(
    (i) => i.value === ids.interest
  )?.label;

  const areaName = (() => {
    if (!ids.area) return null;

    for (const parent of areaOptions) {
      const child = parent.children?.find((c) => c.id === ids.area);
      if (child) return `${parent.area_name} ${child.area_name}`;
    }
    return null;
  })();

  const handleEdit = (id: number) => {
    router.push(`/community/${id}/edit`);
  };

  const handleDelete = (data: DeleteModalData) => {
    console.log("외부 handleDelete 호출됨", data); // ✅ 로그 찍히는지
    if (data.type === "post" && typeof data.id === "number") {
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
    }
  };

  return (
    <div className="flex justify-between relative text-gray-600 text-sm">
      <div className="flex gap-4">
        <span className="font-medium">{categoryName}</span>

        {ids.interest && (
          <span className="ml-2 flex items-center gap-1">
            <HeartIcon />
            {interestName}
          </span>
        )}
        {ids.area && (
          <span className="flex gap-2 items-center">
            <MapPin />
            <span>{areaName}</span>
          </span>
        )}
      </div>
      {(is_mine || isAdmin) && (
        <ActionMenu
          targetId={ids.id}
          onEdit={handleEdit}
          onDelete={() =>
            openModal("DeleteModal", { id: ids.id, type: "post" })
          }
        />
      )}
      <DeleteModal onDelete={handleDelete} />
    </div>
  );
}
