'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ApplicantTable from './_components/ApplicantTable';
import LeaderProfile from './_components/LeaderProfile';
import LeaderDetail from './_components/LeaderDetail';
import { useAuthStore } from '@/stores/useAuth';
import { useDeleteLeader, useMyLeaderApplication } from '@/hooks/useLeader';
import Button from '@/components/common/Button';

const LeaderPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  const { data: myLeader, isLoading, isError, } = useMyLeaderApplication();
  const { mutate: deleteLeaderMutate } = useDeleteLeader();

  const handleDelete = () => {
    if (!myLeader) return;
  
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteLeaderMutate(myLeader.id, {
        onSuccess: () => {
          alert('삭제되었습니다.');
          router.push('/leader/write');
        },
        onError: () => {
          alert('삭제에 실패했습니다.');
        },
      });
    }
  };
    

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!user) {
      alert("리더 신청은 로그인 후 이용하실 수 있습니다.");
      router.replace('/login');
    } else if (user.role === 'user') {
      router.replace('/leader/write');
    } else if (user.role === 'leader' && isError) {
      router.replace('/leader/write');
    }
  }, [user, isError, router]);

  // user 정보 없을 땐 렌더링 막기
  if (!user) return null;

  // 로딩 중
  if (user.role === 'leader' && isLoading) {
    return <p>로딩 중...</p>;
  }

  // 리더 상세정보 표시
  if (user.role === 'leader' && myLeader) {
    return (
      <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
        <h2 className="text-lg font-semibold">나의 리더 신청 정보</h2>
        <LeaderProfile leader={myLeader} currentStatus={myLeader.status} setCurrentStatus={() => {}} />
        <LeaderDetail leader={myLeader} />
        <Button
          color="gray"
          height="h-16"
          className="w-full text-sm font-bold"
          onClick={handleDelete}
        >
          삭제하기
        </Button>
      </main>
    );
  }

  // 관리자 화면
  if (user.role === 'admin') {
    return (
      <main className="px-10 py-12 max-w-5xl mx-auto space-y-10">
        <ApplicantTable />
      </main>
    );
  }

  return null;
};

export default LeaderPage;
