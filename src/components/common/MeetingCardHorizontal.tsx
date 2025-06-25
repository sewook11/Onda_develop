// "use client";

// import React from "react";
// import { Calendar, MapPin, MessageSquareIcon } from "lucide-react";
// import Image from "next/image";
// import { MeetingCardProps } from "@/types/meetings";
// import DefaultGatheringImage from "../common/DefaultMeetingImage";
// import MeeringStatusButtons from "@/app/_components/MeetingStatusButton";
// import { INTEREST_CATEGORY_MAP } from "@/constants/interestCategory";

// export default function MeetingCardHorizontal({
//   item,
//   isApplied = false,
//   context,
// }: MeetingCardProps) {
//   const {
//     title,
//     interest,
//     date,
//     time,
//     area,
//     image,
//     contact,
//     status: rawStatus,
//   } = item;

//   const { label: interestLabel, icon: interestIcon } = INTEREST_CATEGORY_MAP[
//     interest
//   ] ?? {
//     label: "알 수 없음",
//     icon: null,
//   };

//   const status: "모집중" | "모집 마감" =
//     rawStatus === "모집 마감" ? "모집 마감" : "모집중";

//   return (
//     <div className="w-full rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all bg-white flex flex-col gap-2">
//       {/* 카테로리 */}
//       <div className="flex items-center gap-2 text-sm text-orange-400 font-semibold">
//         {interestIcon}
//         {interestLabel}
//       </div>

//       {/* 본문내용 */}
//       <div className="flex gap-4">
//         {/* 이미지 */}
//         <div className="w-32 h-32 relative rounded-md overflow-hidden bg-gray-200 shrink-0 self-center">
//           {image ? (
//             <Image
//               src={image}
//               alt={title}
//               fill
//               className="object-cover"
//               sizes="100%"
//             />
//           ) : (
//             <DefaultGatheringImage width="w-32" height="h-32" />
//           )}
//         </div>

//         {/* 내용 */}
//         <div
//           className={`flex flex-col justify-between flex-1 ${isApplied && context !== "past" ? "min-h-[160px]" : "min-h-[120px]"}`}
//         >
//           <div className="space-y-1 overflow-hidden">
//             <div className="font-bold text-sm mb-1">{title}</div>

//             <div className="text-gray-600 text-xs flex items-center">
//               <Calendar size={16} className="mr-1" />
//               {date} (
//               {new Date(date).toLocaleDateString("ko-KR", {
//                 weekday: "short",
//               })}
//               ) {time}
//             </div>

//             <div className="text-gray-600 text-xs flex items-center">
//               <MapPin size={16} className="mr-1" />
//               {area}
//             </div>

//             {isApplied && contact && (
//               <div className="text-gray-600 text-xs flex items-center break-all">
//                 <MessageSquareIcon size={16} className="mr-1" />
//                 <a
//                   href={contact}
//                   target="_blank"
//                   rel="noopenenr noreferrer"
//                   className="hover:underline hover:text-orange-500 font-medium transition"
//                 >
//                   오픈채팅
//                 </a>
//               </div>
//             )}
//           </div>

//           {/* 버튼 */}
//           <div className="mt-2">
//             <MeeringStatusButtons
//               status={status}
//               mode={context === "past" ? "past" : "default"}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
