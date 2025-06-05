import { useSignupStore } from "@/stores/useSignUpStore";

export default function AreaSelector() {
  const AREA_OPTIONS = {
    서울: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "광진구",
      "관악구",
      "송파구",
    ],
    부산: ["해운대구", "수영구", "부산진구"],
    대구: ["수성구", "중구", "달서구"],
    인천: ["중구", "남동구", "부평구"],
    광주: ["동구", "서구", "광산구"],
    대전: ["동구", "중구", "유성구"],
  } as const;

  type Sido = keyof typeof AREA_OPTIONS;

  const { selectedSido, selectedDistrict, selectSido, setDistrict } =
    useSignupStore();

  const sidos = Object.keys(AREA_OPTIONS) as Sido[];
  const districts = selectedSido ? AREA_OPTIONS[selectedSido as Sido] : [];

  return (
    <div className="w-full max-w-[600px] border rounded-lg p-4 bg-white h-[300px]">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* 지역 */}
        <div className="flex flex-col gap-2 h-full">
          <div className="font-semibold sticky top-0 bg-white px-3 py-2 pb-1">
            전국
          </div>
          <div className="overflow-auto" style={{ maxHeight: "230px" }}>
            {sidos.map((sido) => (
              <button
                key={sido}
                type="button"
                onClick={() => selectSido(sido)}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedSido === sido
                    ? "border-orange-500 bg-orange-100 font-bold text-orange-600"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {sido}
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽: 구/군 체크박스 */}
        <div className="flex flex-col gap-2 h-full">
          <label className="sticky top-0 bg-white px-2 py-1 flex items-center justify-between ">
            <div className="font-semibold">전체</div>
          </label>
          <div
            className="overflow-y-auto flex-1"
            style={{ maxHeight: "230px" }}
          >
            {districts.map((district: string) => (
              <label
                key={district}
                className="flex items-center justify-between px-2 py-1 h-10 text-gray-700"
              >
                <span
                  className={`${selectedDistrict === district ? "font-bold" : ""}`}
                >
                  {district}
                </span>
                <input
                  type="radio"
                  name="district"
                  checked={selectedDistrict === district}
                  onChange={() =>
                    setDistrict(selectedDistrict === district ? null : district)
                  }
                  className="accent-orange-600 w-4 h-4"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
