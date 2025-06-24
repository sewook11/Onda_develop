import api from '@/apis/app';

export async function getMeetDetail(meet_id: number) {
  const response = await api.get(`/meets/${meet_id}`);
  return response.data;
}
