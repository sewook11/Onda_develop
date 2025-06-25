import { FileData } from "./file";

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

export type Meeting = {
  id: number;
  title: string;
  description: string;
  area: string;
  date: string;
  file: FileData;
  max_people: number;
  current_people: number;
  application_deadline: string;
  status: string;
  sesstion_count: number;
  meet_rating: number;
}

export type Review = {
  id: number;
  nickname: string;
  rating: number;
  content: string;
  created_at: string;
  meet_title: string;
  meet_date: string;
  meet_location: string;
}

export type ReviewResponse = {
  average_rating: number;
  reviews: Review[];
};