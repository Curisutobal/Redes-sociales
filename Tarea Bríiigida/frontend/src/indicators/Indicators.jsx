import React, { useEffect, useState } from "react";
import "./Indicators.css";

export const Indicators = () => {
  const [indicators, setIndicators] = useState([]);
  const [indicatorData, setIndicatorData] = useState([]);

  const getAllIndicators = async () => {
    const data = await fetch("http://localhost:3000/indicator", {
      method: "GET",
    });
    const indicatorName = await data.json();
    setIndicators(indicatorName);
  };

  const getIndicatorData = async (id) => {
    const data = await fetch(`http://localhost:3000/indicator/${id}`, {
      method: "GET",
    });
    const indicatorData = await data.json();
    setIndicatorData(indicatorData);
  };

  useEffect(() => {
    getAllIndicators();
  }, []);

  return (
    <div className="container-indicators">
      <div className="sidebar">
        {indicators.map((i) => (
          <button key={i.id} onClick={() => getIndicatorData(i.id)}>
            {i.name}
          </button>
        ))}
      </div>
      <div className="indicator-information">
        {indicatorData.map((i) => (
          <div key={i.idCommune}>
            <p>{i.commune}</p>
            <p>{i.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
