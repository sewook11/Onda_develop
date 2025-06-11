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

export type Review = {
  id: number;
  user_id: number;
  meet_id: number;
  rating: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}