import { useSignupStore } from "@/stores/useSignUpStore";

interface InterestOption {
  id: number;
  interest_name: string;
}

type Props = {
  interests: InterestOption[];
};
export default function InterestSelector({ interests }: Props) {
  const { interest_ids, setInterestIds } = useSignupStore();
  const toggleInterest = (id: number) => {
    if (interest_ids.includes(id)) {
      setInterestIds(interest_ids.filter((item) => item !== id));
    } else {
      setInterestIds([...interest_ids, id]);
    }
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      {interests.map((interest) => {
        return (
          <label
            key={interest.id}
            className="flex items-center gap-2 text-gray-800"
          >
            <input
              type="checkbox"
              name="interest"
              className="accent-orange-600"
              checked={interest_ids.includes(interest.id)}
              onChange={() => toggleInterest(interest.id)}
            />
            {interest.interest_name}
          </label>
        );
      })}
    </div>
  );
}
