import TextInput from "../../../components/common/TextInput";

interface LabeledInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export default function LabeledInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: LabeledInputProps) {
  return (
    <div>
      <label className="text-xs font-bold text-gray-700">{label}</label>
      <div className="mt-3">
        <TextInput
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          type={type}
        />
      </div>
    </div>
  );
}
