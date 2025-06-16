import { END_POINT } from "@/constants/route";
import api from "./app";
import { AgeGroup, Area, Category, DigitalLevel, Interest } from "@/types/options";

export interface OptionResponse {
    age_group: AgeGroup[];
    areas: Area[];
    categories: Category[];
    digital_level: DigitalLevel[];
    interests: Interest[];
}

// 모든 옵션 목록 조회
export const getOptions = async () => {
  const response = await api.get<OptionResponse>(END_POINT.OPTIONS);
  console.log("옵션 목록", response.data);

  return response.data;
};

// 연령대 목록 조회
export const getAgeOptions = async () => {
  const response = await api.get(END_POINT.OPTIONS_AGE);
  console.log("나이 옵션 목록", response.data);

  return response.data;
};

// 지역 목록 조회
export const getAreaOptions = async () => {
  const response = await api.get(END_POINT.OPTIONS_AREAS);
  console.log("지역 옵션 목록", response.data);

  return response.data;
};

// 카테고리 목록 조회
export const getCategoryOptions = async () => {
  const response = await api.get(END_POINT.OPTIONS_CATEGORIES);
  console.log("지역 옵션 목록", response.data);

  return response.data;
};

// 관심사 목록 조회
export const getInterestOptions = async () => {
  const response = await api.get(END_POINT.OPTIONS_INTEREST);
  console.log("관심사 옵션 목록", response.data);

  return response.data;
};

// 디지털레벨 목록 조회
export const getDigitalOptions = async () => {
  const response = await api.get(END_POINT.OPTIONS_DIGITAL);
  console.log("디지털 옵션 목록", response.data);

  return response.data;
};