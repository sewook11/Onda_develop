'use client'

import { getStatusLabel } from "@/constants/leaderStatusLabel";
import { ApplicationStatus, LeaderApplicationDetail } from "@/types/leader";
import { UserRound } from "lucide-react";
import Image from "next/image";
import StatusDropdown from "./StatusDropDown";
import { useAuthStore } from "@/stores/useAuth";

type LeaderProfileProps = {
    leader: LeaderApplicationDetail;
    currentStatus: ApplicationStatus;
    setCurrentStatus: (status: ApplicationStatus) => void;
  };
  
const LeaderProfile = ({ leader, currentStatus, setCurrentStatus }: LeaderProfileProps) => {
    const { user } = useAuthStore();
    const { label, className, icon } = getStatusLabel(currentStatus, 'leader');
    
    return (
        <div className="flex items-center space-x-4 p-4 justify-between">
            <div className="flex items-center gap-5">
                <div className="w-40 h-40 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center">
                    {leader?.profileImage ? (
                    <Image
                        src={leader.profileImage}
                        alt="프로필 이미지"
                        fill
                        className="object-cover"
                        sizes="80px"
                        priority
                    />
                    ) : (
                    <UserRound className="text-gray-400 w-20 h-20" />
                    )}
                </div>
                <div className="space-y-2">
                    {user?.isAdmin && currentStatus && setCurrentStatus ? (
                        <StatusDropdown value={currentStatus} onChange={setCurrentStatus} />
                        ) : (
                        <div className={`flex items-center gap-2 text-sm font-medium ${className}`}>
                            {icon}
                            {label}
                        </div>
                    )}
                    <h3 className="text-lg font-semibold">{leader?.name}님</h3>
                </div>
            </div>
            <div className="flex flex-col space-y-3 text-sm text-gray-800">
                <p>
                    <span className="font-semibold mr-2">이메일</span>
                    {leader?.email}
                </p>
                <p>
                    <span className="font-semibold mr-2">전화번호</span>
                    {leader?.phone}
                </p>
                <p>
                    <span className="font-semibold mr-2">생년월일</span>
                    {leader?.birth?.toLocaleDateString("ko-KR")}
                </p>
                <p>
                    <span className="font-semibold mr-2">관심 분야</span>
                    {leader?.interests?.join(', ')}
                </p>
            </div>
    </div>
    );
}

export default LeaderProfile