export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  sources?: string[];
}

export interface RuntimeMetrics {
  latency_ms: number;
  prompt_tokens: number;
  completion_tokens: number;
  cost_usd: number;
}

export interface AskResponse extends RuntimeMetrics {
  answer: string;
  sources: string[];
}
