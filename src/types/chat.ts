export type ChatMessage = {
    user_id?: number;
    nickname: string;
    message: string;
  }

  export type OldChatMessage = {
    id: number;
    user_id: number;
    nickname: string;
    content: string;
    created_at: string;
  }