import { MeetingFilter, StatusOption } from "@/types/meetings";

export const DEFAULT_MEETING_FILTER: MeetingFilter = {
  interest: undefined,
  digitalLevel: undefined,
  area: { parentId: undefined, childId: undefined },
  status: undefined,
};

export const STATUS_OPTION: StatusOption[] = [
  { id: 0, name: "전체", value: undefined },
  { id: 1, name: "모집중", value: true },
  { id: 2, name: "마감", value: false },
];