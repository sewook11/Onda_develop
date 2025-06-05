import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-500 z-50 h-[160px]">
      <div className="h-full px-6 md:px-12 font-[10px] text-gray-500">
        <div className="h-full flex flex-col md:flex-row justify-between items-center md:items-center gap-6 md:gap-0">
          {/* 좌측 */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-left pt-r md:pt-0 pt-4">
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

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mt-6 md:mt-0 md:gap-6 md:self-center">
            <div className="flex gap-4 flex-wrap justify-center md:justify-end">
              <span className="hover:underline cursor-pointer">이용약관</span>
              <span className="hover:underline cursor-pointer">회사소개</span>
              <span className="hover:underline cursor-pointer">문의하기</span>
              <span className="hover:underline cursor-pointer">
                개인정보처리방침
              </span>
            </div>
            <div className="flex gap-4 justify-center md:justify-end pb-4">
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
      </div>
    </footer>
  );
}
