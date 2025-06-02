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
  };
}