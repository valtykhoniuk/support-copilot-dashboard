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

export interface EvalPassRate {
  passed: number;
  total: number;
}

export interface EvalMetrics {
  golden_rag: EvalPassRate;
  golden_agent: EvalPassRate;
  llm_judge: EvalPassRate;
  ragas: {
    faithfulness: number;
    answer_relevancy: number;
    context_precision: number;
    context_recall: number;
  };
}

export interface AskResponse extends RuntimeMetrics {
  answer: string;
  sources: string[];
}
