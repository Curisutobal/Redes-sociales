import { useState } from "react";
import "./App.css";
import { Indicators } from "./indicators/Indicators";
import { Commune } from "./communes/Commune";

function App() {
  const [activeBtn, setActiveBtn] = useState(0);

  return (
    <div>
      <header className="header">
        <h1 className="main-header">ETL</h1>
        <nav>
          <button
            onClick={() => setActiveBtn(0)}
            className={`btn-nav ${activeBtn === 0 ? "active" : ""}`}
          >
            Comunas
          </button>

          <button
            onClick={() => setActiveBtn(1)}
            className={`btn-nav ${activeBtn === 1 ? "active" : ""}`}
          >
            Indicadores
          </button>
        </nav>
      </header>
      <div className="content">
        {activeBtn === 0 ? <Commune /> : <Indicators />}
      </div>
    </div>
  );
}

export default App;
