"use client";

import React, { useEffect, useState } from "react";
import MeetImageUploader from "../../create/_components/MeetImageUploader";
import { AreaOption } from "@/app/signup/page";
import {
  getAreaOptions,
  getCategoryOptions,
  getDigitalOptions,
} from "@/apis/options";
import TextInput from "@/components/common/TextInput";
import ToggleButtonGroup from "@/components/common/ToggleButtonGroup";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import AreaSelector from "@/components/common/AreaSelector";
import api from "@/apis/app";
import { MeetingSelectBox } from "../../create/_components/MeetingSelectBox";
import {
  categoryOption,
  digitalLevelOption,
  MeetFormData,
} from "@/types/meetings";
import { useParams, useRouter } from "next/navigation";
import { getMeetDetail } from "@/apis/meetingApi";

export default function EditPage() {
  const [formData, setFormData] = useState<MeetFormData | null>(null);
  const [areaInfo, setAreaInfo] = useState({
    selectedSido: "",
    selectedDistrict: "",
    area_id: -1,
  });
  const [imageId, setImageId] = useState<number | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [areaOptions, setAreaOptions] = useState<AreaOption[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<categoryOption[]>([]);
  const [digitalLevelOptions, setDigitalLevelOptions] = useState<
    digitalLevelOption[]
  >([]);
  console.log(previewImageUrl);
  const params = useParams();
  const router = useRouter();
  const meetId = params.meet_id;

  // 옵션 데이터 불러오기
  useEffect(() => {
    const fetchOptions = async () => {
      const areaData = await getAreaOptions();
      setAreaOptions(areaData);
      const category = await getCategoryOptions();
      setCategoryOptions(category.results);
      const digital = await getDigitalOptions();
      setDigitalLevelOptions(digital.results);
    };
    fetchOptions();
  }, []);

  const convertContactValue = (text: string): string => {
    // 예: API에서 "온라인" 오면 "on-line"으로 변환
    switch (text) {
      case "온라인":
        return "on-line";
      case "오프라인":
        return "off-line";
      case "온/오프라인":
        return "on-off-line";
      default:
        return text; // 그대로 반환
    }
  };

  // 기존 모임 데이터 불러오기
  useEffect(() => {
    const fetchMeet = async () => {
      const detail = await getMeetDetail(Number(meetId));
      console.log("💡 detail 값 확인", detail);

      setFormData({
        title: detail.title || "",
        description: detail.description || "",
        digital_level: detail.digital_level?.id || 0,
        category: detail.category?.id || 0,
        date: detail.schedule[0],
        contact: convertContactValue(detail.contact || ""),
        session_count: detail.session_count || 1,
        max_people: detail.max_people || 1,
        location: detail.location || "",
        file: detail.file?.id || 0,
        application_deadline: detail.application_deadline?.slice(0, 10) || "",
        link: detail.link || "",
      });

      setAreaInfo({
        selectedSido: detail.area_info?.sido || "",
        selectedDistrict: detail.area_info?.district || "",
        area_id: detail.area || -1,
      });

      setImageId(detail.file?.id || null);
      setPreviewImageUrl(detail.file?.file || null);
    };

    fetchMeet();
  }, [meetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    const submitData = {
      ...formData,
      area: areaInfo.area_id,
      file: imageId,
    };
    await api.put(`/meets/${meetId}`, submitData);
    alert("수정이 완료되었습니다.");
    router.push(`/meet/${meetId}`);
  };

  if (!formData) return <div className="text-center py-20">로딩 중...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      <MeetImageUploader
        setImageId={setImageId}
        initialImageId={imageId}
        initialImageUrl={previewImageUrl}
      />

      <div className="space-y-12">
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="개설할 모임 이름"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <MeetingSelectBox
            label="카테고리"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {categoryOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.category_name}
              </option>
            ))}
          </MeetingSelectBox>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="일정"
            type="date"
            value={formData?.date || ""}
            onChange={(e) =>
              setFormData({ ...formData!, date: e.target.value })
            }
            required
          />
          <TextInput
            label="모집 마감일"
            type="date"
            value={formData.application_deadline}
            onChange={(e) =>
              setFormData({
                ...formData,
                application_deadline: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="모집 인원(최대)"
            type="number"
            value={formData.max_people || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                max_people: Number(e.target.value),
              })
            }
            required
          />
          <TextInput
            label="횟수(최대4회)"
            type="number"
            value={formData.session_count || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                session_count: Number(e.target.value),
              })
            }
            required
          />
        </div>

        <ToggleButtonGroup
          label="방법"
          value={formData.contact}
          onChange={(value) => setFormData({ ...formData, contact: value })}
          options={[
            { label: "온라인", value: "on-line" },
            { label: "오프라인", value: "off-line" },
            { label: "온/오프라인", value: "on-off-line" },
          ]}
        />

        <MeetingSelectBox
          label="디지털 난이도"
          value={formData.digital_level}
          onChange={(e) =>
            setFormData({
              ...formData,
              digital_level: Number(e.target.value),
            })
          }
        >
          {digitalLevelOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.display}
            </option>
          ))}
        </MeetingSelectBox>

        <div className="relative w-full text-sm">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            지역
          </label>
          <button
            type="button"
            className="w-full border px-4 py-2 rounded flex justify-between items-center"
            onClick={() => setIsAreaOpen((prev) => !prev)}
          >
            {areaInfo.selectedSido && areaInfo.selectedDistrict
              ? `${areaInfo.selectedSido} ${areaInfo.selectedDistrict}`
              : "지역 선택"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isAreaOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white rounded shadow">
              <AreaSelector
                areaOptions={areaOptions}
                areaInfo={areaInfo}
                setAreaInfo={setAreaInfo}
              />
            </div>
          )}
        </div>

        <TextInput
          label="상세 모임 위치(주소) 및 장소"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
        <Textarea
          label="모임 소개"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <div className="text-center pt-4 space-y-2">
          <Button type="submit" width="w-full" height="h-[44px]">
            모임 수정하기
          </Button>
          <button
            type="button"
            onClick={() => router.push(`/meet/${meetId}`)}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 w-full h-[44px] font-bold rounded-md transition text-sm"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
}
