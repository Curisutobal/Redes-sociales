import { NlpManager } from "node-nlp";

const manager = new NlpManager({ languages: ["es"], forceNER: true });

(async () => {
  manager.addDocument("es", "María fue a Santiago en abril", "viaje");
  manager.addDocument("es", "Pedro visitó Valparaíso el 15 de enero", "viaje");
  manager.addDocument(
    "es",
    "El 10 de junio, Juan viajó a Buenos Aires",
    "viaje"
  );
  manager.addDocument(
    "es",
    "Ana regresó el 3 de marzo desde Barcelona",
    "viaje"
  );
  manager.addDocument("es", "Me siento muy feliz hoy", "sentimiento");
  manager.addDocument("es", "Estoy triste por lo que pasó", "sentimiento");
  manager.addDocument(
    "es",
    "Estoy emocionado de empezar este proyecto",
    "sentimiento"
  );
  manager.addNamedEntityText("person", "María", ["es"], ["María"]);
  manager.addNamedEntityText("person", "Pedro", ["es"], ["Pedro"]);
  manager.addNamedEntityText("person", "Juan", ["es"], ["Juan"]);
  manager.addNamedEntityText("location", "Santiago", ["es"], ["Santiago"]);
  manager.addNamedEntityText("location", "Valparaíso", ["es"], ["Valparaíso"]);
  manager.addNamedEntityText(
    "location",
    "Buenos Aires",
    ["es"],
    ["Buenos Aires"]
  );
  manager.addNamedEntityText("location", "Barcelona", ["es"], ["Barcelona"]);

  await manager.train();

  const longText = `
    El 5 de mayo de 2025, María y su amigo Santiago fueron a la playa en Barcelona para disfrutar del buen clima. 
    Había muchas personas en la playa, algunas tomando el sol, otras jugando al fútbol. 
    En la tarde, después de un delicioso almuerzo en un restaurante local, decidieron dar un paseo por las calles de la ciudad. 
    Aunque la ciudad estaba llena de turistas, María y Santiago disfrutaron mucho de su tiempo juntos.
  `;

  const response = await manager.process("es", longText);

  console.log("Texto:", longText);
  console.log("Intención:", response.intent);
  console.log("Sentimiento:", response.sentiment);
  console.log("Entidades:", response.entities);
})();
