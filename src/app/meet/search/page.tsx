'use client';

import React, { useState } from 'react';
import MeetSearchBar from '@/app/meet/search/_components/MeetSearchBar';
import MeetFilterBar from '@/app/meet/search/_components/MeetFilterBar';
import MeetCardList from '@/app/meet/search/_components/MeetCardList';

export default function MeetSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    area: '',
    digitalLevel: '',
  });

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-xl font-bold text-main mb-6">모임 검색</h1>

      <MeetSearchBar value={searchQuery} onChange={setSearchQuery} onSearch={() => {}} />

      <MeetFilterBar filters={filters} onChange={setFilters} />

      <MeetCardList searchQuery={searchQuery} filters={filters} />
    </main>
  );
}
