export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  sources?: string[];
}

export interface AskResponse {
  answer: string;
  sources: string[];
}
