// import { SignupState } from "@/hooks/useSignupSubmit";
import TextInput from "../../../components/common/TextInput";

interface Props {
  // birthYear: string;
  // birthMonth: string;
  // birthDay: string;
  // setSignupData: React.Dispatch<React.SetStateAction<SignupState>>;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  setSignupData: (updated: {
    birthYear: string;
    birthMonth: string;
    birthDay: string;
  }) => void;
}

export default function BirthDateInput({
  birthYear,
  birthMonth,
  birthDay,
  setSignupData,
}: Props) {
  return (
    <div>
      <label className="text-xs font-bold text-black">생년월일</label>
      <div className="mt-3 flex gap-2 items-center">
        <TextInput
          name="birthYear"
          value={birthYear}
          onChange={(e) =>
            setSignupData({
              birthYear: e.target.value,
              birthMonth: birthMonth,
              birthDay: birthDay,
            })
          }
          placeholder="YYYY"
          type="number"
          required
        />
        <span className="text-gray-400">/</span>
        <TextInput
          name="birthMonth"
          value={birthMonth}
          onChange={(e) =>
            setSignupData({
              birthYear: birthYear,
              birthMonth: e.target.value,
              birthDay: birthDay,
            })
          }
          placeholder="MM"
          type="number"
          required
        />
        <span className="text-gray-400">/</span>
        <TextInput
          name="birthDay"
          value={birthDay}
          onChange={(e) =>
            setSignupData({
              birthYear: birthYear,
              birthMonth: birthMonth,
              birthDay: e.target.value,
            })
          }
          placeholder="DD"
          type="number"
          required
        />
      </div>
    </div>
  );
}
