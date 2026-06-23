import "../index.css";
import type { RuntimeMetrics } from "../entities/types";

interface DashboardProps {
  metrics: RuntimeMetrics | null;
}

const Dashboard = ({ metrics }: DashboardProps) => {
  return (
    <section className="dashboard">
      <h2>AI Ops</h2>

      <h3 className="dashboard__section-title">Last request</h3>
      <div className="dashboard__grid">
        <div className="stat-card">
          <span className="stat-card__label">Latency (ms)</span>
          <span className="stat-card__value">
            {metrics?.latency_ms ?? "—"}
          </span>
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
          <span className="stat-card__value">25/25</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Agent evals</span>
          <span className="stat-card__value">10/10</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">LLM judge</span>
          <span className="stat-card__value">95%</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Ragas faithfulness</span>
          <span className="stat-card__value">0.99</span>
        </div>
      </div>

      <p className="dashboard__note">
        Runtime metrics update after each chat message.
      </p>
    </section>
  );
};

export default Dashboard;
