"use client";

import Button from "@/components/common/Button";
import LoginForm from "@/app/login/_components/Loginform";
import { useAuthStore } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { email, password, setEmail, setPassword, reset, login } =
    useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const success = login(email, password);
    console.log(success);
    if (success) {
      alert("로그인 성공!");
      reset();
      router.push("/");
    } else {
      alert("로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <main className="max-w-md mx-auto px-6 py-28">
      <div className="w-full max-w-md px-4">
        <h1 className="text-sm font-bold text-center mb-10">빠른 로그인하기</h1>
        <Button
          variant="fill"
          width="w-full"
          height="h-[69px]"
          className="bg-[#FEE500] text-black font-bold rounded-md"
          onClick={() => alert("카카오 로그인 시도")}
        >
          <div className="flex items-center justify-center gap-3">
            <Image
              src="/assets/icon/Kakao.svg"
              alt="kakao"
              width={25}
              height={25}
            />
            <span className=" text-black font-bold text-sm">카카오 로그인</span>
          </div>
        </Button>
        <div className="mt-20 text-sm font-bold text-black text-center">
          가입했던 이메일로 로그인할래요
        </div>
        <div className="mt-6 space-y-4">
          <LoginForm
            email={email}
            password={password}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
            onSubmit={handleLogin}
          />
        </div>
        <div
          className="text-xs text-end mt-6 text-black cursor-pointer"
          onClick={() => router.push("/signup")}
        >
          회원가입
        </div>
      </div>
    </main>
  );
}
