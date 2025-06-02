import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full bg-white h-[160px] border-t border-gray-500 z-50">
      <div className="mx-auto flex h-full items-center justify-between px-12 font-[10px] text-gray-500">
        <div className="flex items-center gap-10">
          <Link href={"/"}>
            <Image
              src="/assets/logo/logo.svg"
              alt="onda"
              width={43}
              height={38}
            />
          </Link>
          <div className="flex flex-col gap-[2px] leading-snug">
            <p>
              상호 : (주)라운에이지 | 대표자명 : 박아영 | 사업자등록번호 :
              000-00-0000
            </p>
            <p>주소 : 서울시 성동구 매봉길 50, 1층</p>
            <p>고객센터 : ahyoungpark012@gmail.com</p>
            <p>Copyright@ 2025 Onda Inc. All right reserved.</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">이용약관</span>
            <span className="hover:underline cursor-pointer">회사소개</span>
            <span className="hover:underline cursor-pointer">문의하기</span>
            <span className="hover:underline cursor-pointer">
              개인정보처리방침
            </span>
          </div>
          <div className="flex gap-4">
            <Link href={"#"}>
              <Image
                src="/assets/logo/instagram.svg"
                alt="instagram"
                width={24}
                height={24}
              />
            </Link>
            <Link href={"#"}>
              <Image
                src="/assets/logo/linkedIn.svg"
                alt="linkedIn"
                width={24}
                height={24}
              />
            </Link>
            <Link href={"#"}>
              <Image
                src="/assets/logo/twitter.svg"
                alt="twitter"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
