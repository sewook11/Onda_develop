import { Search } from "lucide-react";
import React, { useState } from "react";
import AreaDropdown from "./AreaDropdown";
import SelectBox from "@/components/common/SelectBox";
import { digitalLevelOptions, interestOptions } from "@/constants/category";
import { useAppSearchParams } from "@/stores/useAppSearchParams";

export default function PostSearchDropdown() {
  const [showDetail, setShwoDetail] = useState(false);
  const { searchParams, updateParams, resetParams } = useAppSearchParams();

  const handleToggle = () => setShwoDetail((prev) => !prev);

  return (
    <div className="w-full flex flex-col gap-4 mb-4">
      {/* 옵션 영역 */}
      {showDetail && (
        <div className="flex flex-wrap gap-4">
          <SelectBox
            value={searchParams.interest_id}
            options={interestOptions}
            placeholder="관심사"
            onChange={(e) =>
              updateParams("interest_id", Number(e.target.value))
            }
          />
          <AreaDropdown />
          <SelectBox
            value={searchParams.digitalLevel_id}
            options={digitalLevelOptions}
            placeholder="디지털 난이도"
            onChange={(e) =>
              updateParams("digitalLevel_id", Number(e.target.value))
            }
          />
        </div>
      )}
      {/* 버튼 영역 */}
      <div className="flex gap-4">
        <button
          onClick={handleToggle}
          className="flex gap-2 py-1 rounded-full bg-gray-200 px-4 hover:bg-gray-400 text-gray-700"
        >
          상세검색
          <Search />
        </button>
        <button
          onClick={resetParams}
          className="flex gap-2 py-1 rounded-full bg-gray-200 px-4 hover:bg-gray-400 text-gray-700"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
