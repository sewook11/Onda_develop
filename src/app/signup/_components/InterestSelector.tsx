import { useSignupStore } from "@/stores/useSignUpStore";

interface InterestOption {
  id: number;
  interest_name: string;
}

type Props = {
  interests: InterestOption[];
};
export default function InterestSelector({ interests }: Props) {
  const { interest_id, setValue } = useSignupStore();

  return (
    <div className="grid grid-cols-3 gap-2">
      {interests.map((interest) => {
        return (
          <label
            key={interest.id}
            className="flex items-center gap-2 text-gray-800"
          >
            <input
              type="radio"
              name="interest"
              className="accent-orange-600"
              checked={interest_id === interest.id}
              onChange={() => setValue("interest_id", interest.id)}
            />
            {interest.interest_name}
          </label>
        );
      })}
    </div>
  );
}
