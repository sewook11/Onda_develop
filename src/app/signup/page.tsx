"use client";
import { useSignupStore } from "@/stores/useSignUpStore";
import AreaSelector from "@/components/common/AreaSelector";
import InterestSelector from "@/app/signup/_components/InterestSelector";
import DigitalLevelSelector from "@/app/signup/_components/DigitalLevelSelector";
import { useSignupSubmit } from "@/hooks/useSignupSubmit";
import LabeledInput from "@/app/signup/_components/LabeledInput";
import BirthDateInput from "@/app/signup/_components/BirthDateInput";

export default function SignupPage() {
  const { handleSubmit, setValue } = useSignupSubmit();
  const {
    email,
    password,
    password_confirm,
    nickname,
    name,
    phone,
    birthYear,
    birthMonth,
    birthDay,
    agreement,
    toggleAgreement,
  } = useSignupStore();

  return (
    <main className="w-full max-w-[1280px] px-16 py-12 mx-auto">
      <h1 className="text-xl font-bold mb-10">회원가입</h1>

      <div className="w-full flex justify-center mt-20">
        <form
          id="signupForm"
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-md"
        >
          <LabeledInput
            label="이름"
            name="name"
            value={name}
            onChange={(e) => setValue("name", e.target.value)}
            placeholder="이름"
            required
          />
          <LabeledInput
            label="닉네임"
            name="nickname"
            value={nickname}
            onChange={(e) => setValue("nickname", e.target.value)}
            placeholder="닉네임"
            required
          />
          <BirthDateInput
            birthYear={birthYear}
            birthMonth={birthMonth}
            birthDay={birthDay}
            setValue={setValue}
          />
          <LabeledInput
            label="이메일"
            name="email"
            value={email}
            onChange={(e) => setValue("email", e.target.value)}
            placeholder="이메일"
            required
          />
          <LabeledInput
            label="비밀번호"
            name="password"
            value={password}
            onChange={(e) => setValue("password", e.target.value)}
            placeholder="비밀번호"
            type="password"
            required
          />
          <LabeledInput
            label="비밀번호 확인"
            name="password_confirm"
            value={password_confirm}
            onChange={(e) => setValue("password_confirm", e.target.value)}
            placeholder="비밀번호 확인"
            type="password"
            required
          />
          <LabeledInput
            label="전화번호"
            name="phone"
            value={phone}
            onChange={(e) => setValue("phone", e.target.value)}
            placeholder="전화번호"
            required
          />
          <div>
            <label className="text-xs font-bold text-gray-700">지역</label>
            <div className="mt-3">
              <AreaSelector />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700">
              관심사(중복가능)
            </label>
            <div className="mt-3">
              <InterestSelector />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700">
              디지털 친숙도
            </label>
            <div className="mt-3">
              <DigitalLevelSelector />
            </div>
          </div>
          {/* 약관 동의 & 완료 버튼 */}
          <div className="mt-12 border-t border-gray-300 pt-8 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreement}
                onChange={toggleAgreement}
                className="accent-orange-600 w-4 h-4"
                id="agreement"
              />
              <label
                htmlFor="agreement"
                className="leading-snug break-words text-gray-700"
              >
                [필수] ‘개인정보 수집 및 이용’, ‘서비스 이용 약관’ 등에 모두
                동의합니다.
              </label>
            </div>

            <button
              type="submit"
              form="signupForm"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded"
            >
              완료하기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
