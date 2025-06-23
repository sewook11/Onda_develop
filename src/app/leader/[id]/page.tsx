'use client';

import { useParams } from 'next/navigation';
import LeaderDetail from '../_components/LeaderDetail';
import LeaderProfile from '../_components/LeaderProfile';
import { useLeaderDetail, useUpdateLeaderStatus } from '@/hooks/useLeader';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { ApplicationStatus } from '@/types/leader';
import { useRouter } from 'next/navigation';


const LeaderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);

  const { data: leader, isLoading, isError } = useLeaderDetail(id);

  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus | null>(null);

  const { mutate: updateStatus } = useUpdateLeaderStatus(id);

  const handleSave = () => {
    if (!currentStatus) return;

    console.log(currentStatus)
    updateStatus(currentStatus, {
      onSuccess: () => {
        alert('상태가 성공적으로 저장되었습니다.');
        router.refresh()
      },
      onError: () => {
        alert('상태 저장에 실패했습니다.');
      },
    });
  };

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !leader) return <p>데이터를 불러올 수 없습니다.</p>;

  return (
    <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
      <h2 className="text-lg font-semibold">리더 신청</h2>
      <LeaderProfile
        leader={leader}
        currentStatus={currentStatus ?? leader.status}
        setCurrentStatus={setCurrentStatus}
      />
      <LeaderDetail leader={leader} />
      <Button
        height="h-16"
        className="w-full text-sm font-bold"
        onClick={handleSave}
      >
        저장하기
      </Button>
    </main>
  );
};

export default LeaderDetailPage;
