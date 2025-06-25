import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  rounded?: string;
  className?: string;
}
export default function Skeleton({
  width = "w-full",
  height = "1rem",
  circle = false,
  rounded = "rounded-lg",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "bg-gray-200 animate-pulse",
        width,
        height,
        circle ? "rounded-full" : rounded,
        className
      )}
    />
  );
}
