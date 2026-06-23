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
      <header className="app__header">
        <h1>Support Copilot Dashboard</h1>
        <p>Chat + AI ops monitoring for FoxSchool Support Copilot.</p>
      </header>

      <div className="app__layout">
        <Chat onAskComplete={setRuntimeMetrics} />
        <Dashboard metrics={runtimeMetrics} />
      </div>
    </div>
  );
}
