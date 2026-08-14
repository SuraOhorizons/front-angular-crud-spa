export interface ChatSource {
  id: string;
  title: string;
  score: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  query: string;
  conversation_id: string | null;
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
  conversation_id: string;
}
