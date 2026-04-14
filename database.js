const Database = require('better-sqlite3');
const db = new Database('pokemons.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS pokemons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(100) NOT NULL,
        tipo VARCHAR(100) NOT NULL,
        altura_m DOUBLE,
        peso_kg DOUBLE,
        habilidades VARCHAR(300),
        geracao INTEGER
    );

    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(20) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    pokemon_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (pokemon_id) REFERENCES pokemons(id)
    );
`);

console.log("Banco de dados conectado")

function insertPokemon(pokemon) {
    const stmt = db.prepare(`
        INSERT INTO pokemons (nome, tipo, altura_m, peso_kg, habilidades, geracao)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
    pokemon.nome,
    JSON.stringify(pokemon.tipo),
    pokemon.altura_m,
    pokemon.peso_kg,
    JSON.stringify(pokemon.habilidades),
    pokemon.geracao
    );
}

module.exports = db;