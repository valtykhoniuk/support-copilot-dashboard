import { useState } from "react";
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";
import type { RuntimeMetrics } from "./entities/types";
import "./index.css";

export default function App() {
  const [runtimeMetrics, setRuntimeMetrics] = useState<RuntimeMetrics | null>(
    null,
  );

  return (
    <div className="app">
      <header className="app__header glass">
        <div className="app__brand">
          <span className="app__logo" aria-hidden="true">
            🦊
          </span>
          <div>
            <h1>
              FoxSchool{" "}
              <span className="app__title-accent">Support Copilot</span>
            </h1>
            <p>Chat + AI ops monitoring</p>
          </div>
        </div>
      </header>

      <div className="app__layout">
        <Chat onAskComplete={setRuntimeMetrics} />
        <Dashboard metrics={runtimeMetrics} />
      </div>
    </div>
  );
}
