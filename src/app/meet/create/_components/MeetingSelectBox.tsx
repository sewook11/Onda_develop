interface SelectBoxProps {
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
  label?: string;
}
export function MeetingSelectBox({
  label,
  value,
  onChange,
  children,
  className = '',
  placeholder = '선택하세요',
}: SelectBoxProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <select
        value={value}
        onChange={onChange}
        className={`border border-gray-300 text-sm rounded-md px-3 h-[44px] ${className}`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {children}
      </select>
    </div>
  );
}
