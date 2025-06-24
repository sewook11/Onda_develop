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
  context?: 'applied' | 'past';
}

export type Review = {
  id: number;
  user_id: number;
  meet_id: number;
  rating: number;
  content: string;
  created_at: Date;
  updated_at: Date;
};
export interface MeetFormData {
  title: string;
  description: string;
  digital_level: string | number;
  category: string | number;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  contact: string;
  session_count: number | null;
  max_people: number | null;
  file: number;
  application_deadline: string;
  link: string;
}

export type digitalLevelOption = {
  id: number;
  level: number;
  description: string;
  display: string;
};
export type categoryOption = {
  id: number;
  category_name: string;
};
export type interestOption = {
  id: number;
  interest_name: string;
};
