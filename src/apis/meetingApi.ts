import api from '@/apis/app';

export async function getMeetDetail(id: number) {
  const response = await api.get(`/meets/${id}`);
  return response.data;
}

export const getMeetingInfo = async (params: {
  title?: string;
  interest?: number;
  area?: number;
  digital_level?: number;
  status?: boolean;
}) => {
  const { data } = await api.get('/meets', { params });
  return data;
};
