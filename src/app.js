import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import livro from "./models/livros.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDataBase();

if (conexao) {
    conexao.on("error", (erro) => {
        console.error("erro de conexão", erro);
    });

    conexao.once("open", () => {
        console.log("Conexão feita com sucesso!");
    });
}

const app = express();
routes(app);

app.get("/livros/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const livroEncontrado = await livro.findById(id);
        if (!livroEncontrado) return res.status(404).json({ message: "Livro não encontrado" });
        res.status(200).json(livroEncontrado);
    } catch (erro) {
        res.status(500).json({ message: "Erro ao buscar livro", erro: String(erro) });
    }
});

app.post("/livros", async (req, res) => {
    try {
        const novoLivro = await livro.create(req.body);
        res.status(201).json(novoLivro);
    } catch (erro) {
        res.status(400).json({ message: "Erro ao cadastrar livro", erro: String(erro) });
    }
});

app.put("/livros/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const atualizando = await livro.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!atualizando) return res.status(404).json({ message: "Livro não encontrado" });
        res.status(200).json(atualizando);
    } catch (erro) {
        res.status(400).json({ message: "Erro ao atualizar livro", erro: String(erro) });
    }
});

app.delete("/livros/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const removido = await livro.findByIdAndDelete(id);
        if (!removido) return res.status(404).json({ message: "Livro não encontrado" });
        res.status(200).json({ message: "Livro removido com sucesso" });
    } catch (erro) {
        res.status(500).json({ message: "Erro ao remover livro", erro: String(erro) });
    }
});

export default app;


