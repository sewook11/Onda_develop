import { POST_CATEGORY_MAP } from "@/constants/category";
import { INTEREST_CATEGORY_MAP } from "@/constants/interestCategory";
import { MapPin } from "lucide-react";
import ActionMenu from "./ActionMenu";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/stores/useModalStore";
import DeleteModal from "./DeleteModal";
import { PostIds } from "@/types/post";

interface PostMetadataProps {
  ids: PostIds;
  is_mine: boolean;
}

export default function PostMetaData({ ids, is_mine }: PostMetadataProps) {
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/community/${id}/edit`);
  };

  const { openModal } = useModalStore();

  return (
    <div className="flex justify-between relative text-gray-600 text-sm">
      <div className="flex gap-4">
        <span className="font-medium">
          {ids.category && POST_CATEGORY_MAP[ids.category]}
        </span>
        {typeof ids.interest === "number" && (
          <span className="ml-2 flex items-center gap-1">
            {INTEREST_CATEGORY_MAP[ids.interest].icon}
            {INTEREST_CATEGORY_MAP[ids.interest].label}
          </span>
        )}
        {ids.area && (
          <span className="flex gap-2 items-center">
            <MapPin />
            <span>{ids.area}</span>
          </span>
        )}
      </div>
      {is_mine && (
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
