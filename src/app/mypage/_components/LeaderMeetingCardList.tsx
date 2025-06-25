import LeaderMeetingCard from './LeaderMeetingCard';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LeaderMeeting } from '@/types/meetings';

const LeaderMeetingList = ({ meetings }: { meetings: LeaderMeeting[] }) => {
  const router = useRouter();

  const [status, setStatus] = useState('');

  return (
    <div className="space-y-6 mb-5">
      <h2 className="text-lg font-semibold">내 모임</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 text-xs rounded-md px-3 h-10"
          >
            <option value="">전체 상태</option>
            <option value="모집중">모집중</option>
            <option value="완료">완료</option>
          </select>
          <button onClick={() => console.log('조회 클릭')} className="w-16 h-10 text-xs p-0 rounded-md bg-primary">
            조회
          </button>
        </div>
        <Button
          onClick={() => router.push('/meet/create')}
          className="text-white flex text-xs gap-1 font-semibold"
          color="accent"
          width="w-auto"
          height="h-10"
        >
          <Plus size={20} strokeWidth={3} />
          모임 생성하기
        </Button>
      </div>
      <div className="space-y-4">
        {meetings?.map((meeting: LeaderMeeting, idx: number) => <LeaderMeetingCard key={idx} meeting={meeting} />)}
      </div>
    </div>
  );
};

export default LeaderMeetingList;
