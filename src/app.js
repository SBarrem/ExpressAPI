import express from "express";
import livro from "./models/livros.js";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
routes(app);

app.delete("/livros/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const removido = await livro.findByIdAndDelete(id);

        if (!removido) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }

        res.status(200).json({ message: "Livro removido com sucesso" });
    } catch (erro) {
        res.status(500).json({ message: "Erro ao remover livro", erro: String(erro) });
    }
});

export default app;