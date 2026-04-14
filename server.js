const express = require('express');
const db = require('./database');
const app = express();
const PORT = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = "segredo_super_secreto";

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get("/pokemons", (req, res) => {
    const { tipo, geracao, nome } = req.query;

    let query = "SELECT * FROM pokemons WHERE 1=1";
    let params = [];

    if (tipo) {
        query += " AND tipo LIKE ?";
        params.push(`%${tipo}%`);
    }

    if (geracao) {
        query += " AND geracao = ?";
        params.push(geracao);
    }

    if (nome) {
        query += " AND nome LIKE ?";
        params.push(`%${nome}%`);
    }

    const pokemons = db.prepare(query).all(...params);

    const parsed = pokemons.map(p => ({
        ...p,
        tipo: JSON.parse(p.tipo),
        habilidades: JSON.parse(p.habilidades)
    }));

    res.json(parsed);
});

app.get("/usuarios", (req, res) => {
    const usuarios = db.prepare("SELECT * FROM usuarios").all();
    res.json(usuarios);
});

app.get("/usuarios/:id/favoritos", auth, (req, res) => {
    const userId = req.params.id;

    const result = db.prepare(`
        SELECT pokemons.*
        FROM favoritos
        JOIN pokemons ON favoritos.pokemon_id = pokemons.id
        WHERE favoritos.usuario_id = ?
    `).all(userId);

    const parsed = result.map(p => ({
        ...p,
        tipo: JSON.parse(p.tipo),
        habilidades: JSON.parse(p.habilidades)
    }));

    res.json(parsed);
});

app.post("/pokemons", (req, res) => {
    const nome = req.body.nome;
    const tipo = req.body.tipo;
    const altura_m = req.body.altura_m;
    const peso_kg = req.body.peso_kg;
    const habilidades = req.body.habilidades;
    const geracao = req.body.geracao;

    const result = db.prepare(`
        INSERT INTO pokemons (nome, tipo, altura_m, peso_kg, habilidades, geracao)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        nome,
        JSON.stringify(tipo),
        altura_m,
        peso_kg,
        JSON.stringify(habilidades),
        geracao
    );

    const novoPokemon = db.prepare(
        "SELECT * FROM pokemons WHERE id = ?"
    ).get(result.lastInsertRowid);

    res.status(201).json({
        mensagem: "Pokemon criado com sucesso",
        pokemon: {
            id: novoPokemon.id,
            nome: novoPokemon.nome,
            tipo: JSON.parse(novoPokemon.tipo),
            altura_m: novoPokemon.altura_m,
            peso_kg: novoPokemon.peso_kg,
            habilidades: JSON.parse(novoPokemon.habilidades),
            geracao: novoPokemon.geracao
        }
    });
});

app.post("/favoritos", auth, (req, res) => {
    const pokemon_id = req.body.pokemon_id;

    db.prepare(`
        INSERT INTO favoritos (usuario_id, pokemon_id)
        VALUES (?, ?)
    `).run(req.user.id, pokemon_id);

    res.status(201).json({ mensagem: "Favorito adicionado" });
});

app.post("/usuarios", async (req, res) => {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
        return res.status(400).json({ mensagem: "Nome e senha obrigatórios" });
    }

    const hash = await bcrypt.hash(senha, 10);

    const result = db.prepare(`
        INSERT INTO usuarios (nome, senha)
        VALUES (?, ?)
    `).run(nome, hash);

    res.status(201).json({ mensagem: "Usuário criado" });
});

app.post("/login", async (req, res) => {
    const { nome, senha } = req.body;

    const user = db.prepare(`
        SELECT * FROM usuarios WHERE nome = ?
    `).get(nome);

    if (!user) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha inválida" });
    }

    const token = jwt.sign(
        { id: user.id, nome: user.nome },
        SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ mensagem: "Token não fornecido" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ mensagem: "Token inválido" });
    }
}

app.put("/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body;

    const existing = db.prepare("SELECT * FROM pokemons WHERE id = ?").get(id);

    if (!existing) {
        return res.status(404).json({
            mensagem: "Pokemon não encontrado"
        });
    }

    db.prepare(`
        UPDATE pokemons
        SET nome = ?, tipo = ?, altura_m = ?, peso_kg = ?, habilidades = ?, geracao = ?
        WHERE id = ?
    `).run(
        body.nome || existing.nome,
        JSON.stringify(body.tipo || JSON.parse(existing.tipo)),
        body.altura_m || existing.altura_m,
        body.peso_kg || existing.peso_kg,
        JSON.stringify(body.habilidades || JSON.parse(existing.habilidades)),
        body.geracao || existing.geracao,
        id
    );

    const updated = db.prepare("SELECT * FROM pokemons WHERE id = ?").get(id);

    res.json({
        mensagem: "Pokemon atualizado com sucesso",
        pokemon: {
            ...updated,
            tipo: JSON.parse(updated.tipo),
            habilidades: JSON.parse(updated.habilidades)
        }
    });
});

app.delete("/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const existing = db.prepare("SELECT * FROM pokemons WHERE id = ?").get(id);

    if (!existing) {
        return res.status(404).json({
            mensagem: "Pokemon não encontrado"
        });
    }

    db.prepare("DELETE FROM pokemons WHERE id = ?").run(id);

    res.json({
        mensagem: "Pokemon removido com sucesso"
    });
});