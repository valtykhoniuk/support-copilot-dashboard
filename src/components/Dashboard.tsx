import "../index.css";

const Dashboard = () => {
  return (
    <section className="dashboard">
      <h2>AI Ops</h2>
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
        Live latency & cost — next step: GET /metrics from support-copilot.
      </p>
    </section>
  );
};

export default Dashboard;
