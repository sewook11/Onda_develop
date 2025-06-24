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
