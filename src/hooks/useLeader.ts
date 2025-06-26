import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApplicationStatus, Leader, LeaderApplicationDetail, LeaderApplicationRequest } from '@/types/leader';
import { createLeader, deleteLeader, getLeaderApplicants, getLeaderById, getLeaderMeetingById, getMyLeaderApplication, getReviewsLeaderMeeting, updateLeaderStatus } from '@/apis/leader';
import { getReviewsByMeetId } from '@/apis/review';

type LeaderApplicantResponse = {
    data: Leader[];
    totalCount: number;
};

export function useLeaderApplicants(page: number, size: number) {
  return useQuery<LeaderApplicantResponse>({
    queryKey: ['leaderApplicants', page, size],
    queryFn: () => getLeaderApplicants(page, size),
  });
}

// 리더 신청 상세 조회
export function useLeaderDetail(id: number) {
  return useQuery<LeaderApplicationDetail>({
      queryKey: ['leader', id],
      queryFn: () => getLeaderById(id),
      enabled: !!id,
  });
}

// 리더 신청
export function useCreateLeader() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (payload: LeaderApplicationRequest) => createLeader(payload),
      onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
      },
  });
}

// 리더 상태 업데이트
export function useUpdateLeaderStatus(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (status: ApplicationStatus) => updateLeaderStatus(id, status),
      onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
      queryClient.invalidateQueries({ queryKey: ['leader', id] });
      },
  });
}

// 리더 삭제
export function useDeleteLeader() {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: (id: number) => deleteLeader(id),
      onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaders'] });
      },
  });
}

//나의 리더 신청 상세 조회
export function useMyLeaderApplication(enabled: boolean = true) {
    return useQuery<LeaderApplicationDetail>({
      queryKey: ['myLeader'],
      queryFn: getMyLeaderApplication,
      enabled: enabled
    });
}

// 리더기준 나의 모임 조회
export function useLeaderMeetingsById(
  { user_id, size = 10, page = 1 }: { user_id?: number; size?: number; page?: number },
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['leaderMeetings', user_id, page, size],
    queryFn: () => getLeaderMeetingById(user_id!, size, page),
    enabled: enabled && typeof user_id === 'number',
  });
}


// 리더기준 나의 모임 리뷰 조회
export function useLeaderMeetingsReviews(
  { page = 1, size = 10 }: { page?: number; size?: number },
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['leaderReviews', page, size],
    queryFn: () => getReviewsLeaderMeeting(page, size),
    enabled: enabled && !!page && !!size,
  });
}

export function useReviewsByMeetingId({ meetId, size = 10, page = 1, }: { meetId?: number; size?: number; page?: number;}) {
  return useQuery({
    queryKey: ['reviews', meetId, page, size],
    queryFn: () => getReviewsByMeetId(meetId!, size, page),
    enabled: typeof meetId === 'number',
  });
}