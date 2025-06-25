'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MeetingCard } from '@/components/common/MeetingCard';
import { getMeetingInfo } from '@/apis/meetingApi';
import { Meeting } from '@/types/meetings';

interface MeetCardListProps {
  searchQuery: string;
  filters: {
    category: string;
    area: string;
    digitalLevel: string;
  };
}

interface MeetingResponse {
  results: Meeting[];
  count: number;
  next: string | null;
  previous: string | null;
}

export default function MeetCardList({ searchQuery, filters }: MeetCardListProps) {
  const {
    data: meets,
    isLoading,
    isError,
  } = useQuery<MeetingResponse>({
    queryKey: ['meetList', searchQuery, filters],
    queryFn: () =>
      getMeetingInfo({
        title: searchQuery,
        category: filters.category,
        area: filters.area,
        digital_level: filters.digitalLevel,
      }),
  });
  console.log('meets', meets);
  if (isLoading) return <p className="text-center col-span-full">불러오는 중...</p>;
  if (isError) return <p className="text-center col-span-full text-red-500">에러가 발생했습니다.</p>;
  if (!meets) return <p className="text-center col-span-full text-gray-500">데이터를 불러올 수 없습니다.</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meets.results.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">모임이 없습니다.</p>
      ) : (
        meets.results.map((meet) => <MeetingCard key={meet.meet_id} item={meet} />)
      )}
    </section>
  );
}
