import { ApplicationStatus, Leader, LeaderApplicationDetail, LeaderApplicationRequest, SLeader, SLeaderApplicationDetail, transformSLeaderApplicationDetail, transformSLeaderToLeader } from "@/types/leader";
import api from "./app";
import { END_POINT } from "@/constants/route";

export async function getLeaderApplicants(
  page: number,
  size: number
): Promise<{ data: Leader[]; totalCount: number }> {
  const res = await api.get<{
    count: number;
    next: string | null;
    previous: string | null;
    results: SLeader[];
  }>(END_POINT.LEADERS_APPLY, {
    params: { page, size },
  });

  return {
    data: res.data.results.map(transformSLeaderToLeader),
    totalCount: res.data.count,
  };
}


export async function getLeaderById(id: number): Promise<LeaderApplicationDetail> {
  const { data } = await api.get<SLeaderApplicationDetail>(END_POINT.LEADERS_DETAIL(id));
  console.log(data);
  return transformSLeaderApplicationDetail(data);
}

export async function getMyLeaderApplication(): Promise<LeaderApplicationDetail> {
  const { data } = await api.get<SLeaderApplicationDetail>(END_POINT.LEADERS_DETAIL_MINE);
  console.log(data);
  return transformSLeaderApplicationDetail(data);
}

export async function createLeader(payload: LeaderApplicationRequest): Promise<Leader> {
  const { data } = await api.post<Leader>(END_POINT.LEADERS_APPLY, payload);
  return data;
}

export async function updateLeaderStatus(id: number, payload: ApplicationStatus): Promise<LeaderApplicationDetail> {
  const { data } = await api.patch<LeaderApplicationDetail>(END_POINT.LEADERS_STATUS(id),
    { status: payload });
  return data;
}

export async function deleteLeader(id: number): Promise<void> {
  await api.delete(END_POINT.LEADERS_DELETE(id));
}

export async function getLeaderMeetingById(id: number): Promise<void> {
  await api.get(END_POINT.LEADERS_METTINGS(id));
}
