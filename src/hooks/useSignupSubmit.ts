"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuth";
import api from "@/apis/app";
import { END_POINT } from "@/constants/route";
import { useState } from "react";
import { AxiosError } from "axios";

export interface SignupState {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  name: string;
  phone: string;
  area_id: number | null;
  interest_ids: number[];
  digitalLevel_id: number | null;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  selectedSido: string;
  selectedDistrict: string | null;
  agreement: boolean;
  isKakaoUser: boolean;
  isKakaoUserSignedUp: boolean;
}

export function useSignupSubmit() {
  const router = useRouter();
  const initialSignupData: SignupState = {
    email: "",
    password: "",
    password_confirm: "",
    nickname: "",
    name: "",
    phone: "",
    area_id: null,
    interest_ids: [],
    digitalLevel_id: null,
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    selectedSido: "서울",
    selectedDistrict: null,
    agreement: false,
    isKakaoUser: false,
    isKakaoUserSignedUp: false,
  };
  const [signupData, setSignupData] = useState<SignupState>(initialSignupData);
  const {
    area_id,
    email,
    password,
    password_confirm,
    name,
    phone,
    nickname,
    birthYear,
    birthMonth,
    birthDay,
    agreement,
    isKakaoUser,
    interest_ids,
    digitalLevel_id,
  } = signupData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("현재 제출 직전 signupData:", signupData);
    const requiredFields = [
      { key: "name", value: name },
      { key: "nickname", value: nickname },
      { key: "birthYear", value: birthYear },
      { key: "birthMonth", value: birthMonth },
      { key: "birthDay", value: birthDay },
      ...(isKakaoUser ? [] : [{ key: "email", value: email }]),
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      const emailInput = document.querySelector(
        `input[name="email"]`
      ) as HTMLElement;
      emailInput?.focus();
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

    const dateOfBirth = `${birthYear}-${birthMonth}-${birthDay}`;
    if (isNaN(Date.parse(dateOfBirth))) {
      alert("유효한 생년월일을 입력해주세요.");
      const birthYearInput = document.querySelector(
        `input[name="birthYear"]`
      ) as HTMLElement;
      birthYearInput?.focus();
      return;
    }

    if (!agreement) {
      alert("약관에 동의해주세요.");
      const checkbox = document.getElementById("agreement");
      checkbox?.focus();
      return;
    }

    try {
      const submitPayload = {
        password,
        password_confirm,
        name,
        nickname,
        phone_number: phone,
        date_of_birth: `${birthYear}-${birthMonth}-${birthDay}`,
        area: area_id,
        interests: interest_ids,
        digital_level: digitalLevel_id,
      };

      if (isKakaoUser) {
        // 이미 가입된 카카오 유저는 PATCH로 정보 업데이트
        const res = await api.patch(END_POINT.USERS_PROFILE, submitPayload);
        if (res.status === 200) {
          alert("카카오 유저 정보 입력 완료");
          useAuthStore.getState().setKakaoUserSignedUp(true);
          resetForm();
          router.push("/");
        }
      } else {
        // 일반 회원가입은 POST
        const res = await api.post(END_POINT.USERS_SIGNUP, {
          email,
          ...submitPayload,
        });

        if (res.status === 201) {
          alert("회원가입 완료");
          resetForm();
          useAuthStore.getState().setLogout();
          router.push("/login");
        }
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ [key: string]: string[] }>;

      console.error("회원가입 실패", axiosError);

      const errors = axiosError.response?.data;

      if (errors?.email?.[0]?.includes("already exists")) {
        alert("이미 가입된 이메일입니다.");
      } else if (errors?.nickname?.[0]?.includes("already exists")) {
        alert("이미 사용 중인 닉네임입니다.");
      } else if (errors?.error_message?.[0]) {
        alert("자주 사용되는 비밀번호는 사용할 수 없습니다.");
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  const resetForm = () => {
    setSignupData(initialSignupData);
  };

  return { handleSubmit, setSignupData, signupData, resetForm };
}
