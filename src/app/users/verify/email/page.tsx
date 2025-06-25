// /app/users/verify/email/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmailVerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const verified = searchParams.get('verified');
  const message = searchParams.get('message');

  useEffect(() => {
    if (verified === 'true') {
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, [router, verified]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-xl font-bold mb-4">이메일 인증</h1>
      <p className="text-gray-700">{message || '인증 상태를 확인할 수 없습니다.'}</p>
    </div>
  );
}
