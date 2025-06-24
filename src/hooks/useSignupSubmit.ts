'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuth';
import api from '@/apis/app';
import { END_POINT } from '@/constants/route';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { SignupState } from '@/types/signupType';

interface SubmitPayload {
  password: string;
  password_confirm: string;
  name: string;
  nickname: string;
  phone_number: string;
  date_of_birth: string;
  area: number | null;
  interests: number[];
  digital_level: number | null;
  introduction: string;
}

export function useSignupSubmit() {
  const router = useRouter();
  const initialSignupData: SignupState = {
    email: '',
    password: '',
    password_confirm: '',
    nickname: '',
    name: '',
    phone: '',
    area_id: null,
    interest_ids: [],
    digitalLevel_id: null,
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    selectedSido: '서울',
    selectedDistrict: null,
    agreement: false,
    isKakaoUser: false,
    isKakaoUserSignedUp: false,
  };
  const [signupData, setSignupData] = useState<SignupState>(initialSignupData);
  const {
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

  // 유효성 검사 함수들
  const validateRequiredFields = () => {
    const requiredFields = [
      { key: 'name', value: name },
      { key: 'nickname', value: nickname },
      { key: 'birthYear', value: birthYear },
      { key: 'birthMonth', value: birthMonth },
      { key: 'birthDay', value: birthDay },
      ...(isKakaoUser ? [] : [{ key: 'email', value: email }]),
      { key: 'password', value: password },
      { key: 'password_confirm', value: password_confirm },
      { key: 'phone', value: phone },
    ];

    const firstEmpty = requiredFields.find((field) => !field.value?.trim());
    if (firstEmpty) {
      const target = document.querySelector(`input[name="${firstEmpty.key}"]`) as HTMLElement;
      alert('모든 필드를 입력해주세요.');
      target?.focus();
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      const emailInput = document.querySelector(`input[name="email"]`) as HTMLElement;
      emailInput?.focus();
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password !== password_confirm) {
      alert('비밀번호가 일치하지 않습니다.');
      const passwordConfirmInput = document.querySelector(`input[name="password_confirm"]`) as HTMLElement;
      passwordConfirmInput?.focus();
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 영문+숫자 조합의 8자 이상이어야 합니다.');
      const passwordInput = document.querySelector(`input[name="password"]`) as HTMLElement;
      passwordInput?.focus();
      return false;
    }
    return true;
  };

  const validateBirthDate = () => {
    const dateOfBirth = `${birthYear}-${birthMonth}-${birthDay}`;
    if (isNaN(Date.parse(dateOfBirth))) {
      alert('유효한 생년월일을 입력해주세요.');
      const birthYearInput = document.querySelector(`input[name="birthYear"]`) as HTMLElement;
      birthYearInput?.focus();
      return false;
    }
    return true;
  };

  const validateAgreement = () => {
    if (!agreement) {
      alert('약관에 동의해주세요.');
      const checkbox = document.getElementById('agreement');
      checkbox?.focus();
      return false;
    }
    return true;
  };

  // 데이터 준비 함수
  const prepareSubmitPayload = (area_id: number | null): SubmitPayload => {
    console.log('prepareSubmitPayload', area_id);
    return {
      password,
      password_confirm,
      name,
      nickname,
      phone_number: phone,
      date_of_birth: `${birthYear}-${birthMonth}-${birthDay}`,
      area: area_id,
      interests: interest_ids,
      digital_level: digitalLevel_id,
      introduction: '',
    };
  };

  // API 호출 함수들
  const submitKakaoUser = async (submitPayload: SubmitPayload) => {
    const res = await api.patch(END_POINT.USERS_PROFILE, submitPayload);
    if (res.status === 200) {
      alert('카카오 유저 정보 입력 완료');
      useAuthStore.getState().setKakaoUserSignedUp(true);
      resetForm();
      router.push('/');
    }
  };

  const submitRegularUser = async (submitPayload: SubmitPayload) => {
    const res = await api.post(END_POINT.USERS_SIGNUP, {
      email,
      ...submitPayload,
    });
    console.log(res.data);
    if (res.status === 201) {
      alert('회원가입 완료! 이메일 인증을 진행해주세요.');
      resetForm();
      useAuthStore.getState().setLogout();
      router.replace('/login');
    }
  };

  // 에러 처리 함수
  const handleApiError = (err: unknown) => {
    const axiosError = err as AxiosError<{ [key: string]: string[] }>;
    console.error('회원가입 실패', axiosError);

    const errors = axiosError.response?.data;

    if (errors?.email?.[0]?.includes('already exists')) {
      alert('이미 가입된 이메일입니다.');
    } else if (errors?.nickname?.[0]?.includes('already exists')) {
      alert('이미 사용 중인 닉네임입니다.');
    } else if (errors?.error_message?.[0]) {
      alert('비밀번호가 보안 기준을 만족하지 않습니다.');
    } else {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  const resetForm = () => {
    setSignupData(initialSignupData);
  };

  // 메인 제출 함수
  const handleSubmit = async (e: React.FormEvent, area_id: number) => {
    e.preventDefault();
    console.log('현재 제출 직전 signupData:', area_id);

    // 유효성 검사
    if (!validateRequiredFields()) return;
    if (!isKakaoUser && !validateEmail()) return;
    if (!validatePassword()) return;
    if (!validateBirthDate()) return;
    if (!validateAgreement()) return;

    try {
      const submitPayload = prepareSubmitPayload(area_id);

      if (isKakaoUser) {
        await submitKakaoUser(submitPayload);
      } else {
        await submitRegularUser(submitPayload);
      }
    } catch (err: unknown) {
      handleApiError(err);
    }
  };

  return {
    handleSubmit,
    setSignupData,
    signupData,
    resetForm,
  };
}
