import livro from "../models/Livros.js";
import { autor } from "../models/Autor.js";


class LivroController {

      static async listarLivros (req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

    static async listarLivroPorId (req, res) {
    try {
        const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
    }
  };
  
 static async cadastrarLivro(req, res) {
    const novoLivro = req.body;
    try {
        const autorEncontrado = await autor.findById(novoLivro.autor);

        if (!autorEncontrado) {
            return res.status(404).json({ message: "Autor não encontrado" });
        }

        const livroCompleto = {
            titulo: novoLivro.titulo,
            autor: {
                nome: autorEncontrado.nome,
                nacionalidade: autorEncontrado.nacionalidade
            }
        };

        const livroCriado = await livro.create(livroCompleto);
        res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
        res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
}

        static async atualizarLivro (req, res) {
    try {
        const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "livro atualizado"});
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
    }
  };

  static async excluirLivro (req, res) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id, req.body);
      res.status(200).json({message: "livro deletado"})
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  };

};



export default LivroController;