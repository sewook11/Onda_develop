import api from '@/apis/app';

export async function getMeetDetail(meet_id: number) {
  const response = await api.get(`/meets/${meet_id}`);
  return response.data;
}

export const getMeetingInfo = async (params: {
  title?: string;
  category?: string;
  area?: string;
  digital_level?: string;
}) => {
  const { data } = await api.get("/meets", { params });
  return data;
};


