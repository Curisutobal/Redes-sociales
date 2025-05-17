import React, { useEffect, useState } from "react";
import "./Commune.css";

export const Commune = () => {
  const [communes, setCommunes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCommuneData = async () => {
    try {
      setLoading(true);
      const result = await fetch("http://localhost:3000/commune", {
        method: "GET",
      });
      
      if (!result.ok) {
        throw new Error(`Error HTTP: ${result.status}`);
      }
      
      const information = await result.json();
      setCommunes(information);
      setError(null);
    } catch (err) {
      console.error("Error al obtener datos de comunas:", err);
      setError("No se pudieron cargar los datos de comunas. Por favor, intente nuevamente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommuneData();
  }, []);

  if (loading) {
    return <div className="loading">Cargando datos de comunas...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container-commune">
      {communes.length === 0 ? (
        <div className="no-data">No hay información disponible de comunas.</div>
      ) : (
        communes.map((comuna) => (
          <div key={comuna.id} className="comuna-card">
            <h3 className="comuna-title">Información Comunal</h3>
            <div className="comuna-info">
              <div className="info-row">
                <span className="info-label">Nombre Comuna:</span>
                <span className="info-value">{comuna.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Provincia Comuna:</span>
                <span className="info-value">{comuna.province}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Dirección:</span>
                <span className="info-value">{comuna.address}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Alcalde comuna:</span>
                <span className="info-value">{comuna.mayor}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Superficie comuna:</span>
                <span className="info-value">{comuna.surface}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Población comunal:</span>
                <span className="info-value">{comuna.population}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};