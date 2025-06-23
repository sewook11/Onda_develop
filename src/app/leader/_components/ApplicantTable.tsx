'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getStatusLabel } from '@/constants/leaderStatusLabel';
import Pagination from '@/components/Pagination';
import { useLeaderApplicants } from '@/hooks/useLeader';

const ITEMS_PER_PAGE = 10;

const ApplicantTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useLeaderApplicants(currentPage, ITEMS_PER_PAGE);

  if (isLoading) return <p className='text-center'>로딩 중...</p>;
  if (!data || data.data.length === 0) return <p className='text-center'>데이터가 없습니다.</p>;

  const totalPages = Math.ceil(data.totalCount / ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">리더 명단</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-base border-collapse">
          <thead>
            <tr className="text-center bg-gray-100 text-black">
              <th className="p-3">no.</th>
              <th className="p-3">이름</th>
              <th className="p-3">이메일</th>
              <th className="p-3">연락처</th>
              <th className="p-3">상태</th>
              <th className="p-3">신청일</th>
              <th className="p-3">처리일</th>
              <th className="p-3"> </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-center">
            {data.data.map((applicant) => {
              const { label, className, icon } = getStatusLabel(applicant.status, 'admin');

              return (
                <tr key={applicant.id} className="border-t">
                  <td className="p-3">{applicant.id}</td>
                  <td className="p-3 font-medium">{applicant.name ?? '-'}</td>
                  <td className="p-3">{applicant.email ?? '-'}</td>
                  <td className="p-3">{applicant.phone ?? '-'}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center w-20 justify-center rounded-full font-semibold ${className}`}>
                      {icon}
                      {label}
                    </span>
                  </td>
                  <td className="p-3">
                    {applicant.createdAt
                      ? new Date(applicant.createdAt).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="p-3">
                    {applicant.updatedAt
                      ? new Date(applicant.updatedAt).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="p-3">
                    <Link
                      href={`/leader/${applicant.id}`}
                      className="text-base text-gray-600 hover:underline"
                    >
                      상세 보기
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ApplicantTable;
