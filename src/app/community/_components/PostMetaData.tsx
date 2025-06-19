import { MapPin } from "lucide-react";
import ActionMenu from "./ActionMenu";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";
import DeleteModal from "./DeleteModal";
import { PostIds } from "@/types/post";
import useOptions from "@/hooks/useOptions";
import { useAuthStore } from "@/stores/useAuth";

interface PostMetadataProps {
  ids: PostIds;
  is_mine: boolean;
}

export default function PostMetaData({ ids, is_mine }: PostMetadataProps) {
  const router = useRouter();

  const isAdmin = useAuthStore((state) => state.isAdmin);

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

  const { openModal } = useModalStore();

  return (
    <div className="flex justify-between relative text-gray-600 text-sm">
      <div className="flex gap-4">
        <span className="font-medium">{typeof ids.category}</span>
        {categoryName}
        {ids.interest && (
          <span className="ml-2 flex items-center gap-1">{interestName}</span>
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
          onDelete={() => openModal("DeleteModal")}
        />
      )}
      <DeleteModal />
    </div>
  );
}
