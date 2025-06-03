export interface MeetingCardProps {
  item: {
    meet_id: number;
    title: string;
    interest: number;
    date: string;
    time: string;
    location: string;
    image?: string;
    status: string;
    contact?: string;
  };
  isApplied?: boolean; // 신청한 모임인지 여부
  context?: "applied" | "past";
}
