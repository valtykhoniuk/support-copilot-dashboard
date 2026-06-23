import { useState, type FormEvent } from "react";
import type { Message, AskResponse, RuntimeMetrics } from "../entities/types";

interface ChatProps {
  onAskComplete: (metrics: RuntimeMetrics) => void;
}

const Chat = ({ onAskComplete }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) {
      return;
    }
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data: AskResponse = await res.json();

      const botMessage: Message = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: data.answer,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, botMessage]);
      onAskComplete({
        latency_ms: data.latency_ms ?? 0,
        prompt_tokens: data.prompt_tokens ?? 0,
        completion_tokens: data.completion_tokens ?? 0,
        cost_usd: data.cost_usd ?? 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="chat">
      <h2>Chat</h2>
      <div className="chat__messages">
        {messages.length === 0 && (
          <p className="chat__empty">Ask something about FoxSchool…</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`message message--${msg.sender}`}>
            <div className="message__sender">
              {msg.sender === "user" ? "You" : "Copilot"}
            </div>
            <div className="message__text">{msg.text}</div>
            {msg.sources && msg.sources.length > 0 && (
              <ul className="message__sources">
                {msg.sources.map((src) => (
                  <li key={src}>{src}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {loading && <p className="chat__loading">Thinking…</p>}
        {error && <p className="chat__error">{error}</p>}
      </div>
      <form className="chat__form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How much does the Beginner plan cost?"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </section>
  );
};

export default Chat;
