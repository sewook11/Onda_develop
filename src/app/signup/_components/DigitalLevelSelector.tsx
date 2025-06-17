type DigitalLevelSelectorProps = {
  value: number | null;
  onChange: (value: number | null) => void;
};

const DIGITAL_LEVELS = [
  { id: 1, label: "상 - zoom 화상 회의 가능" },
  { id: 2, label: "중 - 기본적인 앱 사용 가능" },
  { id: 3, label: "하 - 전화만 가능" },
];

export default function DigitalLevelSelector({
  value,
  onChange,
}: DigitalLevelSelectorProps) {
  return (
    <div>
      {DIGITAL_LEVELS.map((level) => (
        <label key={level.id} className="flex items-center gap-2 text-gray-800">
          <input
            type="radio"
            className="accent-orange-600"
            checked={value === level.id}
            onChange={() => onChange(value === level.id ? null : level.id)}
          />
          {level.label}
        </label>
      ))}
    </div>
  );
}
