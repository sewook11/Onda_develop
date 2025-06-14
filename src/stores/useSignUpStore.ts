import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SignupState {
  email: string;
  password: string;
  password_confirm: string;
  nickname: string;
  name: string;
  phone: string;
  area_id: number | null;
  interest_id: number | null;
  setInterestId: (id: number) => void;
  digitalLevel_id: number | null;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  isKakaoUser: boolean;
  setIsKakaoUser: (value: boolean) => void;
  isKakaoUserSignedUp: boolean; // 회원가입 수단 구분을 위한 변수
  setKakaoUserSignedUp: (value: boolean) => void;

  // 지역
  selectedSido: string; // 현재 선택된 시/도
  selectedDistrict: string | null;

  // 약관 동의
  agreement: boolean;
  toggleAgreement: () => void;

  // 공통 상태 업데이트 함수
  setValue: <T extends keyof SignupState>(
    key: T,
    value: SignupState[T]
  ) => void;

  // 구/군
  setDistrict: (district: string | null) => void;
  // 시/도
  selectSido: (sido: string) => void;
  resetForm: () => void;
}

export const useSignupStore = create(
  persist<SignupState>(
    (set) => ({
      // 초기 값
      email: "",
      password: "",
      password_confirm: "",
      nickname: "",
      name: "",
      phone: "",
      area_id: null,
      interest_id: null,
      setInterestId: (id) => set({ interest_id: id }),
      digitalLevel_id: null,
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      isKakaoUser: false,
      isKakaoUserSignedUp: false,
      setIsKakaoUser: (value) => set({ isKakaoUser: value }),
      setKakaoUserSignedUp: (value) => set({ isKakaoUserSignedUp: value }),

      selectedSido: "서울",
      selectedDistrict: null,
      agreement: false,

      setValue: (key, value) => set((state) => ({ ...state, [key]: value })),

      // 구/군 토글함수
      setDistrict: (district) =>
        set((state) => ({
          selectedDistrict:
            state.selectedDistrict === district ? null : district,
        })),

      // 시/도 데이터를 바꾸는 함수
      selectSido: (sido) =>
        set(() => ({
          selectedSido: sido,
          selectedDistrict: null, // 사용자가 선택한 지역을 담고 있는 배열 상태
        })),

      toggleAgreement: () => set((state) => ({ agreement: !state.agreement })),

      // 폼상태 초기화
      resetForm: () =>
        set((state) => ({
          ...state,
          email: "",
          password: "",
          password_confirm: "",
          nickname: "",
          name: "",
          phone: "",
          area_id: null,
          interest_id: null,
          digitalLevel_id: null,
          birthYear: "",
          birthMonth: "",
          birthDay: "",
          selectedSido: "서울",
          selectedDistrict: null,
          agreement: false,
          isKakaoUser: false,
          isKakaoUserSignedUp: state.isKakaoUserSignedUp,
        })),
    }),
    {
      name: "signup-storage", // 로컬스토리지에 저장될 키이름
    }
  )
);
