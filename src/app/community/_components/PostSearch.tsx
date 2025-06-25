"use client";

import TextInput from "@/components/common/TextInput";
import { Search } from "lucide-react";
import PostSearchDropdown from "./PostSearchDropdown";
import { useAppSearchParams } from "@/stores/useAppSearchParams";
import { useOptionStore } from "@/stores/useOptionStore";
import { useEffect } from "react";
import DropdownInput from "./DropdownInput";
import { Option } from "@/types/post";

export default function PostSearch() {
  const { searchParams, updateParams } = useAppSearchParams();
  const { options, fetchOptions } = useOptionStore();

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const categoryOptions: Option[] =
    options?.categories?.map((opt) => ({
      id: opt.id,
      name: opt.category_name,
    })) ?? [];

  return (
    <div className="w-full flex flex-col gap-4 border-b-2 mt-10 items-end">
      <div className="w-full flex gap-4 flex-wrap">
        <DropdownInput
          value={searchParams.category}
          onChange={(val) => updateParams("category", val)}
          options={categoryOptions}
          placeholder="카테고리"
          className="min-w-[150px] w-auto"
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
      <PostSearchDropdown 
        options={options}
      />
    </div>
  );
}
