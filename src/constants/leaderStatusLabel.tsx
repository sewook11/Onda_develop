import { ApplicationStatus } from '@/types/user';
import { BadgeCheck, Ban, Loader } from 'lucide-react';
import { ReactNode } from 'react';

type Role = 'admin' | 'leader';

type StatusLabel = {
  label: string;
  className: string;
  icon?: ReactNode;
};

const metaByRole: Record<Role, Record<ApplicationStatus, StatusLabel>> = {
  admin: {
    pending: {
      label: '심사중',
      className: 'bg-gray-500 text-white',
    },
    approved: {
      label: '승인',
      className: 'bg-accent-blue text-white',
    },
    rejected: {
      label: '거절',
      className: 'bg-accnet-red text-white',
    },
  },
  leader: {
    pending: {
      label: '승인 대기중',
      className: 'text-gray-600',
      icon: <Loader size={24} className="mr-1" />,
    },
    approved: {
      label: '승인됨',
      className: 'text-accent-blue',
      icon: <BadgeCheck size={24} className="mr-1" />,
    },
    rejected: {
      label: '활동 중지',
      className: 'text-accent-red',
      icon: <Ban size={24} className="mr-1" />,
    },
  },
};

export const getStatusLabel = (
  status: ApplicationStatus,
  role: Role = 'admin'
): StatusLabel => {
  const roleData = metaByRole[role];
  const statusData = roleData?.[status];

  // fallback 처리
  if (!statusData) {
    return {
      label: '알 수 없음',
      className: 'bg-gray-100 text-gray-500',
    };
  }

  return statusData;
};
