'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatMessage, OldChatMessage } from '@/types/chat';
import { createWebSocket } from '@/utils/soket';
import { getGroupChatMessages } from '@/apis/chat';
import { useAuthStore } from '@/stores/useAuth';
import { Send } from 'lucide-react';
import ChatBubble from '../_components/ChatBubble';

export default function ChatRoom({
  roomId,
  token,
}: {
  roomId: number;
  token: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const initialized = useRef(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthStore();
  const isComposingRef = useRef(false);

  useEffect(() => {
    if (!token || initialized.current) return;
    initialized.current = true;

    const fetchAndConnect = async () => {
      try {
        const oldMessages: OldChatMessage[] = await getGroupChatMessages(roomId);

        const formatted = oldMessages.map((msg) => ({
          nickname: msg.nickname,
          message: msg.content,
        }));

        setMessages(formatted);

        socketRef.current = createWebSocket(roomId, token, (newMessage) => {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.message === newMessage.message && last.nickname === newMessage.nickname) {
              return prev; // 중복이면 추가하지 않음
            }
            return [...prev, newMessage];
          });
        });
      } catch (err) {
        console.error('❌ 채팅방 입장 또는 메시지 불러오기 실패:', err);
      }
    };

    fetchAndConnect();

    return () => {
      socketRef.current?.close();
    };
  }, [roomId, token]);

  // 스크롤 아래로 이동
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    socketRef.current?.send(JSON.stringify({ message }));
    setInput('');
  };

  return (
    <div className="flex flex-col h-[470px]">
      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <ChatBubble
            key={idx}
            isMe={msg.nickname === user?.nickname}
            nickname={msg.nickname}
            message={msg.message}
          />
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* 입력창 */}
      <div className="p-4 border-t flex gap-2">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onCompositionStart={() => { isComposingRef.current = true }}
        onCompositionEnd={() => { isComposingRef.current = false }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (isComposingRef.current) return;
            e.preventDefault();
            sendMessage(input);
          }
        }}
        className="flex-1 resize-none"
        placeholder="메시지를 입력하세요"
      />
        <button
          className="bg-primary-deep text-white px-4 py-2 rounded"
          onClick={() => sendMessage(input)}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
