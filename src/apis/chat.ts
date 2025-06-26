
import { OldChatMessage } from '@/types/chat';
import api from './app';

// 채팅방 입장 (참여 등록)
export async function joinGroupChat(meetId: number): Promise<number> {
  const res = await api.post<{ room_id: number; message: string }>(
    `/group-chat/join/${meetId}`
  );
  return res.data.room_id;
}


// 채팅방 이전 메시지 조회
export async function getGroupChatMessages(roomId: number): Promise<OldChatMessage[]> {
  const res = await api.get(`/group-chat/${roomId}/messages`);
  return res.data;
}
