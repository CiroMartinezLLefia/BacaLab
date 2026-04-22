import express from "express";
import "dotenv/config";
import cors from "cors";
import bacallaRouter from "./routes/bacallaRoutes.js";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bacalla", bacallaRouter);

app.get("/api", (req, res) => {
  res.json({
    mensaje: "Bienvenido a la api de bacalla",
    version: "1.0.0",
    endpoints: "/api/bacalla",
  });
});

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor volando en el puerto ${PORT}`);
  });
});