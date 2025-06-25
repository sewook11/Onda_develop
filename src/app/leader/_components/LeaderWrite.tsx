'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import MultiCategoryFileUpload from './MultiCategoryFileUpload';
import { useCreateLeader } from '@/hooks/useLeader';
import { CertificationRequest } from '@/types/leader';
import { useRouter } from 'next/navigation';

const LeaderWrite = () => {
  const [bio, setBio] = useState('');
  const [certificates, setCertificates] = useState<CertificationRequest[]>([]);
  const router = useRouter();
  const createLeader = useCreateLeader();

  const handleSubmit = async () => {
    if (!bio.trim()) {
      alert('자기소개를 입력해주세요.');
      return;
    }

    console.log('전송할 데이터:', { bio, certificates });

    try {
      await createLeader.mutateAsync({
        bio,
        certificates,
      });
      alert('신청이 완료되었습니다.');
      router.replace('/leader');
    } catch (err) {
      console.error(err);
      alert('제출 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="space-y-10">
      {/* 자기소개 입력 */}
      <div className="space-y-4">
        <h2 className="text-xl">
          자기소개 <span className="text-xs">(최대 1000자)</span>
        </h2>
        <textarea
          className="w-full min-h-96 border border-gray-300 rounded px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>

      {/* 파일 업로드 */}
      <MultiCategoryFileUpload onChange={setCertificates} />

      {/* 제출 버튼 */}
      <Button height="h-16" className="w-full text-sm font-bold" onClick={handleSubmit}>
        제출하기
      </Button>
    </div>
  );
};

export default LeaderWrite;
