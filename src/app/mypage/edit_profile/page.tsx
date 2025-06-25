"use client";

import { useEffect, useState } from "react";
import AreaSelector from "@/components/common/AreaSelector";
import InterestSelector from "@/app/signup/_components/InterestSelector";
import DigitalLevelSelector from "@/app/signup/_components/DigitalLevelSelector";
import BirthDateInput from "@/app/signup/_components/BirthDateInput";
import LabeledInput from "@/app/signup/_components/LabeledInput";
import { useAuthStore } from "@/stores/useAuth";
import api from "@/apis/app";
import { END_POINT } from "@/constants/route";
import { AreaOption } from "@/app/signup/page";
import { getAreaOptions, getInterestOptions } from "@/apis/options";
import { useRouter } from "next/navigation";
type AreaInfoType = {
  area_id: number;
  selectedSido: string;
  selectedDistrict: string;
};

export default function EditProfilePage() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [areaOptions, setAreaOptions] = useState<AreaOption[]>([]);
  const [interestOptions, setInterestOptions] = useState<
    { id: number; interest_name: string }[]
  >([]);
  const [areaInfo, setAreaInfo] = useState({
    area_id: -1,
    selectedSido: "",
    selectedDistrict: "",
  });

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    email: "",
    phone: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    area_id: -1,
    selectedSido: "",
    selectedDistrict: "",
    interests: [] as number[],
    digital_level: null as number | null,
  });

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.patch(
        END_POINT.USERS_PROFILE,
        {
          name: form.name.trim(),
          nickname: form.nickname.trim(),
          phone_number: form.phone.replace(/-/g, ""),
          date_of_birth: `${form.birthYear}-${form.birthMonth}-${form.birthDay}`,
          area_id: form.area_id,
          interests: form.interests,
          digital_level: form.digital_level,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("회원정보가 성공적으로 수정되었습니다.");
      router.replace("/mypage");
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      alert("회원정보 수정에 실패했습니다.");
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get(END_POINT.USERS_PROFILE, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = res.data;

      const [y, m, d] = profile.date_of_birth.split("-");
      setForm((prev) => ({
        ...prev,
        name: profile.name,
        nickname: profile.nickname,
        email: profile.email,
        phone: profile.phone_number,
        birthYear: y,
        birthMonth: m,
        birthDay: d,
        area: profile.area.id,
        selectedSido: profile.area.full_path.split(" ")[0],
        selectedDistrict: profile.area.full_path.split(" ")[1],
        digital_level: profile.digital_level?.id ?? null,
        interests: profile.interests.map((i: { id: number }) => i.id),
      }));
      setAreaInfo({
        area_id: profile.area.id,
        selectedSido: profile.area.full_path.split(" ")[0],
        selectedDistrict: profile.area.full_path.split(" ")[1],
      });
    };

    const fetchOptions = async () => {
      const areaRes = await getAreaOptions();
      const interestRes = await getInterestOptions();
      setAreaOptions(areaRes);
      setInterestOptions(interestRes.results);
    };

    fetchProfile();
    fetchOptions();
  }, [accessToken]);

  const handleAreaInfoChange: React.Dispatch<
    React.SetStateAction<AreaInfoType>
  > = (infoOrUpdater) => {
    // infoOrUpdater는 객체일 수도, 함수일 수도 있음
    const newInfo =
      typeof infoOrUpdater === "function"
        ? infoOrUpdater(areaInfo)
        : infoOrUpdater;

    setAreaInfo(newInfo);
    setForm((prev) => ({
      ...prev,
      area_id: newInfo.area_id,
      selectedSido: newInfo.selectedSido,
      selectedDistrict: newInfo.selectedDistrict,
    }));
  };

  return (
    <main className="w-full max-w-[1280px] px-16 py-12 mx-auto">
      <h1 className="text-xl font-bold mb-10">회원정보 수정</h1>
      <form
        className="space-y-6 w-full max-w-md mx-auto"
        onSubmit={handleSubmit}
      >
        <LabeledInput
          label="이름"
          name="name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          required
        />
        <LabeledInput
          label="닉네임"
          name="nickname"
          value={form.nickname}
          onChange={(e) => setForm((p) => ({ ...p, nickname: e.target.value }))}
          required
        />
        <LabeledInput
          label="이메일"
          name="email"
          value={form.email}
          onChange={() => {}}
          readOnly
          required
        />
        <LabeledInput
          label="전화번호"
          name="phone"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          required
        />
        <BirthDateInput
          birthYear={form.birthYear}
          birthMonth={form.birthMonth}
          birthDay={form.birthDay}
          setSignupData={(updated: {
            birthYear: string;
            birthMonth: string;
            birthDay: string;
          }) => {
            setForm((prev) => ({
              ...prev,
              birthYear: updated.birthYear,
              birthMonth: updated.birthMonth,
              birthDay: updated.birthDay,
            }));
          }}
        />
        <AreaSelector
          areaOptions={areaOptions}
          areaInfo={areaInfo}
          setAreaInfo={handleAreaInfoChange}
          onSelect={(sido, district, areaId) => {
            if (areaId) {
              setForm((prev) => ({
                ...prev,
                area_id: areaId,
                selectedSido: sido,
                selectedDistrict: district,
              }));
            }
          }}
        />

        <InterestSelector
          interests={interestOptions}
          interest_ids={form.interests}
          setInterestIds={(ids) =>
            setForm((prev) => ({ ...prev, interests: ids }))
          }
        />
        <DigitalLevelSelector
          value={form.digital_level}
          onChange={(val) =>
            setForm((prev) => ({ ...prev, digital_level: val }))
          }
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded mt-10"
        >
          수정 완료
        </button>
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={() => router.replace("/mypage")}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded"
          >
            수정 취소
          </button>
        </div>
      </form>
    </main>
  );
}
