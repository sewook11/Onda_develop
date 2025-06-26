import { SelectedArea } from '@/app/community/_components/AreaDropdown';
import { FileData } from './file';
import { Option } from './post';

export interface MeetingFilter {
  interest: Option | undefined;
  area: SelectedArea | undefined;
  digitalLevel: Option | undefined;
  status: boolean | undefined;
}

export interface MeetingCardProps {
  item: {
    id?: number | string | undefined;
    meet_id?: number;
    title: string;
    interest?: number;
    date: string;
    time?: string;
    area: string;
    image?: string;
    file?: FileData | null;
    status: string;
    contact?: string;
  };
  isApplied?: boolean; // 신청한 모임인지 여부
  context?: "applied" | "past";
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

export interface MeetFormData {
  title: string;
  description: string;
  digital_level: string | number;
  category: string | number;
  date: string;
  start_time?: string;
  end_time?: string;
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
export type LeaderMeeting = {
  application_deadline: string;
  area: string;
  current_people: number;
  date: string;
  description: string;
  file: number | null;
  id: number;
  max_people: number;
  meet_rating: number;
  review_count: number;
  session_count: number;
  status: string;
  title: string;
};
export type MeetDetail = {
  application_deadline: string;
  category: {
    id: number;
    category_name: string;
  };
  contact: string;
  current_people: number;
  description: string;
  digital_level: {
    id: number;
    level: number;
    description: string;
    display: string;
  };
  file: {
    id: number;
    user: number;
    category: string;
    file: string;
    file_type: string;
  };
  id: number;
  leader: {
    id: number;
    nickname: string;
    bio: string;
    file: {
      id: number;
      user: number;
      category: string;
      file: string;
      file_type: string;
    };
  };
  link: string;
  location: string;
  max_people: number;
  meet_rating: number;
  member: {
    id: number;
    nickname: string;
    bio: string;
    file: {
      id: number;
      user: number;
      category: string;
      file: string;
      file_type: string;
    };
  };

  review_count: number;
  schedule: string[];
  session_count: number;
  status: string;
  title: string;
};

export interface Meeting {
  meet_id: number;
  user_id: number;
  title: string;
  description: string;
  area: string;
  digitalLevel: number;
  interest: number;
  date: string;
  time: string;
  contact?: string;
  max_people: number;
  current_people: number;
  status: string;
  file?: FileData;
  application_deadline: string;
  updated_at: string;
  created_at: string;
}
