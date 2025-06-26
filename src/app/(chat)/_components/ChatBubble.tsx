'use client';

type ChatBubbleProps = {
  isMe: boolean;
  nickname: string;
  message: string;
};

export default function ChatBubble({ isMe, nickname, message }: ChatBubbleProps) {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[70%] ${isMe ? 'text-right' : 'text-left'}`}>
        {!isMe && <div className="text-xs text-gray-900 mb-1">{nickname}</div>}
        <div
          className={`inline-block px-4 py-2 rounded-lg text-xs break-words ${
            isMe ? 'bg-primary-deep text-white rounded-br-none' : 'bg-sub-blue/40 text-gray-800 rounded-bl-none'
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
