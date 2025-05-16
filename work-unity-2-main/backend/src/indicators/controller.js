export class Controller {
  getAllIndicators(req, res) {
    const allIndicators = [
      {
        id: "numero de indicador único",
        name: "nombre Indicador",
      },
    ];

    return res.json(allIndicators);
  }

  getIndicatorById(req, res) {
    const { id } = req.params;

    const indicator = [
      {
        idCommune: "identificador comuna",
        commune: "nombre comuna",
        value: "Valor indicador",
      },
    ];

    return res.json(indicator);
  }
}

/**
 * Indicadores:
 *
 *  % Población comunal femenina
 *  % Población comunal Masculina
 *  Ingresos por Fondo Común Municipal
 *  Ingresos Propios
 *  Consumo de Agua
 *  Gastos Salud
 *  Ingresos Salud
 */
