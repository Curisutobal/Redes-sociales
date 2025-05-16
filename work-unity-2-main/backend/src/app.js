import express from "express";
import cors from "cors";
import { CommuneRoute } from "./commune/route.js";
import { IndicatorRoute } from "./indicators/route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/commune/", CommuneRoute.route);
app.use("/indicator/", IndicatorRoute.route);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is on in http://localhost:${PORT}`));
