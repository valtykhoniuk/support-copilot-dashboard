import "../index.css";
import type { RuntimeMetrics } from "../entities/types";
import { useEffect, useState } from "react";
import type { EvalMetrics } from "../entities/types";

interface DashboardProps {
  metrics: RuntimeMetrics | null;
}

const Dashboard = ({ metrics }: DashboardProps) => {
  const [evalMetrics, setEvalMetrics] = useState<EvalMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMetrics();
  }, []);

  async function getMetrics() {
    try {
      const response = await fetch("/api/eval_metrics");
      if (!response.ok) {
        throw new Error("Problem with fetching data");
      }
      const data: EvalMetrics = await response.json();
      setEvalMetrics(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load evals");
    }
  }

  return (
    <section className="dashboard">
      <h2>AI Ops</h2>

      <h3 className="dashboard__section-title">Last request</h3>
      <div className="dashboard__grid">
        <div className="stat-card">
          <span className="stat-card__label">Latency (ms)</span>
          <span className="stat-card__value">{metrics?.latency_ms ?? "—"}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Prompt tokens</span>
          <span className="stat-card__value">
            {metrics?.prompt_tokens ?? "—"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Completion tokens</span>
          <span className="stat-card__value">
            {metrics?.completion_tokens ?? "—"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Cost (USD)</span>
          <span className="stat-card__value">
            {typeof metrics?.cost_usd === "number"
              ? metrics.cost_usd.toFixed(6)
              : "—"}
          </span>
        </div>
      </div>

      <h3 className="dashboard__section-title">Eval suite</h3>
      <div className="dashboard__grid">
        <div className="stat-card">
          <span className="stat-card__label">Golden evals</span>
          <span className="stat-card__value">
            {evalMetrics
              ? `${evalMetrics.golden_rag.passed}/${evalMetrics.golden_rag.total}`
              : "—"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Agent evals</span>
          <span className="stat-card__value">
            {evalMetrics
              ? `${evalMetrics.golden_agent.passed}/${evalMetrics.golden_agent.total}`
              : "—"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">LLM judge</span>
          <span className="stat-card__value">
            {evalMetrics
              ? `${Math.round((evalMetrics.llm_judge.passed / evalMetrics.llm_judge.total) * 100)}%`
              : "—"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Ragas faithfulness</span>
          <span className="stat-card__value">
            {evalMetrics?.ragas.faithfulness ?? "-"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Ragas answer relevancy </span>
          <span className="stat-card__value">
            {evalMetrics?.ragas.answer_relevancy ?? "-"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Ragas context recall </span>
          <span className="stat-card__value">
            {evalMetrics?.ragas.context_recall ?? "-"}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Ragas context precision </span>
          <span className="stat-card__value">
            {evalMetrics?.ragas.context_precision ?? "-"}
          </span>
        </div>
      </div>

      <p className="dashboard__note">
        Runtime metrics update after each chat message.
        {error && <span className="dashboard__error"> Eval error: {error}</span>}
      </p>
    </section>
  );
};

export default Dashboard;
