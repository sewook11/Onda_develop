import api from '@/apis/app';

export async function getCategoryOptions() {
  const response = await api.get('/options/categories');
  console.log('response', response.data);
  return response.data;
}

export async function getDigitalLevelOptions() {
  const response = await api.get('/options/digital-levels');
  return response.data;
}
