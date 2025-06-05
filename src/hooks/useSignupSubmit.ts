"use client";
import { useSignupStore } from "@/stores/useSignUpStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuth";

export function useSignupSubmit() {
  const router = useRouter();

  const {
    email,
    password,
    password_confirm,
    name,
    phone,
    nickname,
    birthYear,
    birthMonth,
    setValue,
    agreement,
    resetForm,
    isKakaoUser,
    selectedSido,
    selectedInterests,
    selectedDistrict,
    // setKakaoUserSignedUp,
  } = useSignupStore();

  const { addUser } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      { key: "name", value: name },
      { key: "birthYear", value: birthYear },
      { key: "birthMonth", value: birthMonth },
      { key: "email", value: email },
      { key: "password", value: password },
      { key: "password_confirm", value: password_confirm },
      { key: "phone", value: phone },
    ];

    const firstEmpty = requiredFields.find((field) => !field.value?.trim());

    if (firstEmpty) {
      const target = document.querySelector(
        `input[name="${firstEmpty.key}"]`
      ) as HTMLElement;
      alert("모든 필드를 입력해주세요.");
      target?.focus();
      return;
    }

    if (password !== password_confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      const passwordConfirmInput = document.querySelector(
        `input[name="password_confirm"]`
      ) as HTMLElement;
      passwordConfirmInput?.focus();
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 영문+숫자 조합의 8자 이상이어야 합니다.");
      const passwordInput = document.querySelector(
        `input[name="password"]`
      ) as HTMLElement;
      passwordInput?.focus();
      return;
    }

    if (!agreement) {
      alert("약관에 동의해주세요.");
      const checkbox = document.getElementById("agreement");
      checkbox?.focus();
      return;
    }

    addUser({
      email,
      password,
      name,
      nickname,
      phone,
      selectedSido,
      selectedInterests,
      selectedDistrict,
    });

    resetForm();
    useAuthStore.getState().logout();
    if (isKakaoUser) {
      const { setKakaoUserSignedUp } = useSignupStore.getState();
      setKakaoUserSignedUp(true);
    }
    router.push("/");
  };
  return { handleSubmit, setValue };
}
