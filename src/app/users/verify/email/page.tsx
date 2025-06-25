'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function EmailVerifyContent() {
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
  }, [verified, router]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h1 className="text-xl font-bold mb-4">이메일 인증</h1>
      <p className="text-gray-700">{message || '인증 상태를 확인할 수 없습니다.'}</p>
    </div>
  );
}

export default function EmailVerifyPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h1 className="text-xl font-bold mb-4">이메일 인증</h1>
        <p className="text-gray-700">로딩 중...</p>
      </div>
    }>
      <EmailVerifyContent />
    </Suspense>
  );
}