import { useState } from "react";
import "./App.css";
import { Selector, SelectorAdvanced } from "./selectors/Selector";

function App() {
  const [activeRender, setActiveRender] = useState(0);
  const componentsToRender = [<Selector />, <SelectorAdvanced />];

  return (
    <div>
      <div className="btn-container">
        <button
          className={`btn ${activeRender === 0 ? "active" : ""}`}
          onClick={() => setActiveRender(0)}
        >
          Números
        </button>
        <button
          className={`btn ${activeRender === 1 ? "active" : ""}`}
          onClick={() => setActiveRender(1)}
        >
          Animales
        </button>
      </div>
      {componentsToRender[activeRender]}
    </div>
  );
}

export default App;
