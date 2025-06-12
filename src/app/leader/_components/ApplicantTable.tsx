'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import Link from 'next/link';
import { ApplicationStatus } from '@/types/user';
import { getStatusLabel } from '@/constants/leaderStatusLabel';
import Pagination from '@/components/Pagination';

type Applicant = {
  id: number;
  name: string;
  phone: string;
  attachmentUrl?: string;
  status: ApplicationStatus;
  appliedAt: string;
  processedAt?: string;
};

type ApplicantTableProps = {
  data: Applicant[];
};

const ITEMS_PER_PAGE = 10;

const ApplicantTable = ({ data }: ApplicantTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const paginatedData = data.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
    <h2 className="text-lg font-semibold">리더 명단</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-base border-collapse">
          <thead>
            <tr className="text-center bg-gray-100 text-black">
              <th className="p-3">no.</th>
              <th className="p-3">이름</th>
              <th className="p-3">연락처</th>
              <th className="p-3">첨부 자료</th>
              <th className="p-3">상태</th>
              <th className="p-3">신청일</th>
              <th className="p-3">처리일</th>
              <th className="p-3"> </th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-center">
            {paginatedData.map((applicant) => {
              const { label, className, icon } = getStatusLabel(applicant.status, 'admin');
              return (
                <tr key={applicant.id} className="border-t">
                  <td className="p-3">{applicant.id}</td>
                  <td className="p-3 font-medium">{applicant.name}</td>
                  <td className="p-3">{applicant.phone}</td>
                  <td className="p-3 inline-flex justify-center">
                    {applicant.attachmentUrl ? (
                      <a
                        href={applicant.attachmentUrl}
                        download
                        className="text-gray-600 hover:text-black"
                      >
                        <Download size={16} />
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center w-20 justify-center rounded-full font-semibold ${className}`}
                    >
                      {icon}
                      {label}
                    </span>
                  </td>
                  <td className="p-3">{applicant.appliedAt}</td>
                  <td className="p-3">{applicant.processedAt || '-'}</td>
                  <td className="p-3">
                    <Link
                      href={`/applicants/${applicant.id}`}
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
