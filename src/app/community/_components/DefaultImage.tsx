import { ImageOff } from "lucide-react";
import React from "react";
import clsx from "clsx";

interface DefaultImageProps {
  size?: "big" | "small";
  message?: string;
}

export default function DefaultImage({
  size = "small",
  message = "이미지를 불러올 수 없습니다.",
}: DefaultImageProps) {
  const dimensions =
    size === "big"
      ? "w-[600px] h-[600px]"
      : "w-[150px] h-[150px]";

  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500 rounded-lg text-center",
        dimensions
      )}
    >
      <ImageOff size={size === "big" ? 100 : 40} />
      <span className="p-2">{message}</span>
    </div>
  );
}
