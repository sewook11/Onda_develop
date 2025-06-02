import { useSignupStore } from "@/stores/useSignUpStore";

const INTERESTS = [
  "여행(지역탐방)",
  "건강관리/운동",
  "문화예술/창작",
  "요리/음식",
  "자기계발",
  "봉사/재능기부",
  "명상(마음챙김)",
  "디지털 학습",
  "사교/친목도모",
  "기타",
] as const;

export default function InterestSelector() {
  const { selectedInterests, toggleInterest } = useSignupStore();

  return (
    <div className="grid grid-cols-3 gap-2">
      {INTERESTS.map((interest) => (
        <label key={interest} className="flex items-center gap-2 text-gray-800">
          <input
            type="checkbox"
            className="accent-orange-600"
            checked={selectedInterests.includes(interest)}
            onChange={() => toggleInterest(interest)}
          />
          {interest}
        </label>
      ))}
    </div>
  );
}
