interface AreaSelectorProps {
  areaOptions: {
    area_name: string;
    children: {
      id: number;
      area_name: string;
    }[];
  }[];
  areaInfo: {
    selectedSido: string;
    selectedDistrict: string;
    area_id: number;
  };
  setAreaInfo: React.Dispatch<
    React.SetStateAction<{
      selectedSido: string;
      selectedDistrict: string;
      area_id: number;
    }>
  >;
}

export default function AreaSelector({ areaOptions, areaInfo, setAreaInfo }: AreaSelectorProps) {
  const { selectedSido, selectedDistrict } = areaInfo ?? {
    selectedSido: '',
    selectedDistrict: '',
  };

  // 지역 공동 컴포넌트
  const sidos = areaOptions?.map((area) => area.area_name) || [];
  const districts = Array.isArray(areaOptions)
    ? areaOptions.find((area) => area.area_name === selectedSido)?.children || []
    : [];

  return (
    <div className="w-full max-w-[600px] border rounded-lg p-4 bg-white h-[300px]">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* 지역 */}
        <div className="flex flex-col gap-2 h-full">
          <div className="font-semibold sticky top-0 bg-white px-3 py-2 pb-1">전국</div>
          <div className="overflow-auto" style={{ maxHeight: '230px' }}>
            {sidos.map((sido) => (
              <button
                key={sido}
                type="button"
                onClick={() => setAreaInfo((prev) => ({ ...prev, selectedSido: sido }))}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedSido === sido
                    ? 'border-orange-500 bg-orange-100 font-bold text-orange-600'
                    : 'bg-white hover:bg-gray-100'
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
          <div className="overflow-y-auto flex-1" style={{ maxHeight: '230px' }}>
            {districts.map((district) => (
              <label key={district.id} className="flex items-center justify-between px-2 py-1 h-10 text-gray-700">
                <span className={`${selectedDistrict === district.area_name ? 'font-bold' : ''}`}>
                  {district.area_name}
                </span>
                <input
                  type="radio"
                  name="district"
                  checked={selectedDistrict === district.area_name}
                  onChange={() => {
                    setAreaInfo((prev) => ({
                      ...prev,
                      selectedDistrict: district.area_name,
                      area_id: district.id,
                    }));
                  }}
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
