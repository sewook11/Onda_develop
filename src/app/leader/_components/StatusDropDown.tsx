'use client';

import { useState } from 'react';
import { getStatusLabel } from '@/constants/leaderStatusLabel';
import { ApplicationStatus } from '@/types/user';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

type Props = {
  value: ApplicationStatus;
  onChange: (status: ApplicationStatus) => void;
};

const statuses: ApplicationStatus[] = ['pending', 'approved', 'rejected'];

export default function StatusDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <div className="relative w-48">
      <button
        onClick={toggle}
        className="w-full border px-3 py-2 flex items-center justify-between bg-orange-100 rounded border-primary-deep font-medium text-xs"
      >
        <div className={clsx('flex items-center gap-2', getStatusLabel(value, 'leader').className)}>
          {getStatusLabel(value, 'leader').icon}
          {getStatusLabel(value, 'leader').label}
        </div>
        <ChevronDown size={20} className="text-primary-deep" />
      </button>

      {isOpen && (
        <ul className="absolute top-full mt-1 w-full bg-white border rounded shadow z-10">
          {statuses.map((status) => {
            const { icon, label, className } = getStatusLabel(status, 'leader');
            return (
              <li
                key={status}
                onClick={() => {
                  onChange(status);
                  close();
                }}
                className={clsx(
                  'px-3 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-gray-100',
                  className
                )}
              >
                <div className="flex items-center gap-2 text-xs">
                  {icon}
                  {label}
                </div>
                {value === status && <Check size={16} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
