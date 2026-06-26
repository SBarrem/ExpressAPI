import mongoose from "mongoose";
import app from "./src/app.js";

const PORT = 3000;

mongoose.connect("mongodb+srv://admin:admin123@cluster0.eco2fve.mongodb.net/livraria?appName=Cluster0")
  .then(() => {
    console.log("MongoDB conectado!");
    app.listen(PORT, () => console.log("Servidor escutando!"));
  })
  .catch((err) => console.error("Erro na conexão:", err));