import { SignupState } from "@/stores/useSignUpStore";
import TextInput from "../../../components/common/TextInput";

interface Props {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  setValue: <T extends keyof SignupState>(
    key: T,
    value: SignupState[T]
  ) => void;
}

export default function BirthDateInput({
  birthYear,
  birthMonth,
  birthDay,
  setValue,
}: Props) {
  return (
    <div>
      <label className="text-xs font-bold text-black">생년월일</label>
      <div className="mt-3 flex gap-2 items-center">
        <TextInput
          name="birthYear"
          value={birthYear}
          onChange={(e) => setValue("birthYear", e.target.value)}
          placeholder="YYYY"
          type="number"
          required
        />
        <span className="text-gray-400">/</span>
        <TextInput
          name="birthMonth"
          value={birthMonth}
          onChange={(e) => setValue("birthMonth", e.target.value)}
          placeholder="MM"
          type="number"
          required
        />
        <span className="text-gray-400">/</span>
        <TextInput
          name="birthDay"
          value={birthDay}
          onChange={(e) => setValue("birthDay", e.target.value)}
          placeholder="DD"
          type="number"
          required
        />
      </div>
    </div>
  );
}
