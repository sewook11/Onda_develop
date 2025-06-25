'use client';

import React, { useEffect, useState } from 'react';
import MeetImageUploader from './MeetImageUploader';
import { AreaOption } from '@/app/signup/page';
import { getAreaOptions } from '@/apis/options';
import { getCategoryOptions, getDigitalOptions } from '@/apis/options';
import TextInput from '@/components/common/TextInput';
import ToggleButtonGroup from '@/components/common/ToggleButtonGroup';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';
import AreaSelector from '@/components/common/AreaSelector';
import api from '@/apis/app';
import { MeetingSelectBox } from './MeetingSelectBox';
import { categoryOption, digitalLevelOption, MeetFormData } from '@/types/meetings';

export default function MeetForm() {
  const [areaInfo, setAreaInfo] = useState({
    selectedSido: '',
    selectedDistrict: '',
    area_id: -1,
  });
  const [formData, setFormData] = useState<MeetFormData>({
    title: '',
    description: '',
    digital_level: 0,
    category: 0,
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    contact: '',
    session_count: null,
    max_people: null,
    file: 0,
    application_deadline: '',
    link: '',
  });

  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [areaOptions, setAreaOptions] = useState<AreaOption[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<categoryOption[]>([]);
  const [digitalLevelOptions, setDigitalLevelOptions] = useState<digitalLevelOption[]>([]);
  const [imageId, setImageId] = useState<number | null>(null);
  useEffect(() => {
    const fetchOptions = async () => {
      const data = await getAreaOptions();
      setAreaOptions(data);
      const categoryOptions = await getCategoryOptions();
      setCategoryOptions(categoryOptions.results);
      const digitalLevelOptions = await getDigitalOptions();
      setDigitalLevelOptions(digitalLevelOptions.results);
    };
    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      area: areaInfo.area_id,
      file: imageId,
    };
    console.log('formdata출력', submitData);

    const response = await api.post('/meets', submitData);
    console.log('response', response);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      <MeetImageUploader setImageId={setImageId} />
      <div className="space-y-12">
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="개설할 모임 이름"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="모임 제목을 입력해주세요"
            required
          />
          <MeetingSelectBox
            label="카테고리"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <TextInput
            label="모집 마감일"
            type="date"
            value={formData.application_deadline}
            onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="시작 시간"
            type="time"
            value={formData.start_time}
            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
            required
          />
          <TextInput
            label="종료 시간"
            type="time"
            value={formData.end_time}
            onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="모집 인원(최대)"
            type="number"
            value={formData.max_people || ''}
            onChange={(e) => setFormData({ ...formData, max_people: Number(e.target.value) })}
            placeholder="숫자만 입력"
            required
          />
          <TextInput
            label="횟수(최대4회)"
            type="number"
            value={formData.session_count || ''}
            onChange={(e) => setFormData({ ...formData, session_count: Number(e.target.value) })}
            required
          />
        </div>
        <ToggleButtonGroup
          label="방법"
          value={formData.contact}
          onChange={(value) => setFormData({ ...formData, contact: value })}
          options={[
            { label: '온라인', value: 'on-line' },
            { label: '오프라인', value: 'off-line' },
            { label: '온/오프라인', value: 'on-off-line' },
          ]}
        />
        <MeetingSelectBox
          label="디지털 난이도"
          value={formData.digital_level}
          onChange={(e) => {
            console.log('digital', e.target.value);
            setFormData({ ...formData, digital_level: Number(e.target.value) });
          }}
        >
          {digitalLevelOptions?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.display}
            </option>
          ))}
        </MeetingSelectBox>

        <div className="relative w-full text-sm">
          <label className="text-sm font-medium text-gray-700 mb-1 block">지역</label>
          <button
            type="button"
            className="w-full border px-4 py-2 rounded flex justify-between items-center"
            onClick={() => setIsAreaOpen((prev) => !prev)}
          >
            {areaInfo.selectedSido && areaInfo.selectedDistrict
              ? `${areaInfo.selectedSido} ${areaInfo.selectedDistrict}`
              : '지역 선택'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isAreaOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white rounded shadow">
              <AreaSelector areaOptions={areaOptions} areaInfo={areaInfo} setAreaInfo={setAreaInfo} />
            </div>
          )}
        </div>
        <TextInput
          label="상세 모임 위치(주소) 및 장소"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="예: 서울 강남구"
          required
        />
        <Textarea
          label="모임 소개"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="모임을 소개해주세요"
          required
        />
        <div className="text-center pt-4">
          <Button type="submit" width="w-full" height="h-[44px]">
            모임 생성하기
          </Button>
        </div>
      </div>
    </form>
  );
}
