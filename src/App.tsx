import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Support Copilot Dashboard</h1>
        <p>Chat + AI ops monitoring for FoxSchool Support Copilot.</p>
      </header>

      <div className="app__layout">
        <Chat />
        <Dashboard />
      </div>
    </div>
  );
}
