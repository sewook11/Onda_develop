import { ChatMessage } from "@/types/chat";

export function createWebSocket(
  roomId: number,
  token: string,
  onMessage: (data: ChatMessage) => void
): WebSocket {
  const encodedToken = encodeURIComponent(token);
  const socket = new WebSocket(`wss://api.ondamoim.com/ws/group-chat/${roomId}/?token=${encodedToken}`);

  socket.onopen = () => {
    console.log('✅ WebSocket connected');
  };

  socket.onmessage = (event) => {
    try {
      const data: ChatMessage = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error('❌ Failed to parse WebSocket message:', event.data, err);
    }
  };

  socket.onerror = (event) => {
    console.error('❌ WebSocket error:', event);
  };

  socket.onclose = (event) => {
    console.warn('⚠️ WebSocket closed:', event.code, event.reason);
  };

  return socket;
}
