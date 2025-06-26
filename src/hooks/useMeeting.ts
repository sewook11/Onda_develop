// hooks/useFetchMeetings.ts
import { useQuery } from "@tanstack/react-query";
import { getMeetingInfo } from "@/apis/meetingApi";
import { MeetingFilter, MeetingResponse } from "@/types/meetings";

interface useFetchMeetingsProps {
  searchQuery: string;
  filters: MeetingFilter;
}

export function useFetchMeetings({ searchQuery, filters }: useFetchMeetingsProps) {
  return useQuery<MeetingResponse>({
    queryKey: ["meetList", searchQuery, filters],
    queryFn: () =>
      getMeetingInfo({
        title: searchQuery || undefined,
        interest: filters.interest?.id || undefined,
        area: filters.area?.childId?.id ?? filters.area?.parentId?.id ?? undefined,
        digital_level: filters.digitalLevel?.id || undefined,
        status: filters.status,
      }),
  });
}
