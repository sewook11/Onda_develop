import SelectBox from "@/components/common/SelectBox";
import TextInput from "@/components/common/TextInput";
import { categoryOptions } from "@/constants/category";
import { Search } from "lucide-react";
import PostSearchDropdown from "./PostSearchDropdown";
import { useAppSearchParams } from "@/stores/useAppSearchParams";

export default function PostSearch() {
  const { searchParams, updateParams } = useAppSearchParams();

  return (
    <div className="w-full flex flex-col gap-4 border-b-2 mt-10 items-end">
      <div className="w-full flex gap-4 flex-wrap">
        <SelectBox
          value={searchParams.category_id}
          options={categoryOptions}
          placeholder="카테고리"
          onChange={(e) => updateParams("category_id", Number(e.target.value))}
        />
        <div className="flex-grow">
          <TextInput
            placeholder="제목으로 게시글을 검색해보세요."
            value={searchParams.keyword}
            onChange={(e) =>
              updateParams("keyword", (e.target as HTMLInputElement).value)
            }
            icon={<Search size={24} />}
          ></TextInput>
        </div>
      </div>
      <PostSearchDropdown />
    </div>
  );
}