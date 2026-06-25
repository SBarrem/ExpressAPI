# TODO

- [x] Fix `src/models/livros.js`: remove invalid `nodemon/lib/config` import; fix schema typo (`trype` -> `type`).
- [x] Rewrite `src/app.js` CRUD routes to use the Mongoose `livro` model (remove in-memory `livros`/`buscaLivro`).
- [ ] Verify by running `npm run dev` and checking endpoints: GET `/`, GET `/livros`, GET `/livros/:id`, POST `/livros`, PUT `/livros/:id`, DELETE `/livros/:id`.
