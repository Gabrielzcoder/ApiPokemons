const db = require('./database');

let pokemons = [
    {
        nome: "Gyarados",
        tipo: ["Water", "Flying"],
        altura_m: 6.5,
        peso_kg: 235.0,
        habilidades: ["Intimidate", "Moxie"],
        geracao: 1
    },
    {
        nome: "Golisopod",
        tipo: ["Bug", "Water"],
        altura_m: 2.0,
        peso_kg: 108.0,
        habilidades: ["Emergency Exit"],
        geracao: 7
    },
    {
        nome: "Charizard",
        tipo: ["Fire", "Flying"],
        altura_m: 1.7,
        peso_kg: 90.5,
        habilidades: ["Blaze", "Solar Power"],
        geracao: 1
    },
    {
        nome: "Garchomp",
        tipo: ["Dragon", "Ground"],
        altura_m: 1.9,
        peso_kg: 95.0,
        habilidades: ["Sand Veil", "Rough Skin"],
        geracao: 4
    },
    {
        nome: "Aggron",
        tipo: ["Steel", "Rock"],
        altura_m: 2.1,
        peso_kg: 360.0,
        habilidades: ["Sturdy", "Rock Head", "Heavy Metal"],
        geracao: 3
    },
    {
        nome: "Ceruledge",
        tipo: ["Fire", "Ghost"],
        altura_m: 1.6,
        peso_kg: 62.0,
        habilidades: ["Flash Fire", "Weak Armor"],
        geracao: 9
    },
    {
        nome: "Rillaboom",
        tipo: ["Grass"],
        altura_m: 2.1,
        peso_kg: 90.0,
        habilidades: ["Overgrow", "Grassy Surge"],
        geracao: 8
    },
    {
        nome: "Absol",
        tipo: ["Dark"],
        altura_m: 1.2,
        peso_kg: 47.0,
        habilidades: ["Pressure", "Super Luck", "Justified"],
        geracao: 3
    },
    {
        nome: "Revavroom",
        tipo: ["Steel", "Poison"],
        altura_m: 1.8,
        peso_kg: 120.0,
        habilidades: ["Overcoat", "Filter"],
        geracao: 9
    },
    {
        nome: "Kingdra",
        tipo: ["Water", "Dragon"],
        altura_m: 1.8,
        peso_kg: 152.0,
        habilidades: ["Swift Swim", "Sniper", "Damp"],
        geracao: 2
    },
        {
        nome: "Lucario",
        tipo: ["Fighting", "Steel"],
        altura_m: 1.2,
        peso_kg: 54.0,
        habilidades: ["Steadfast", "Inner Focus", "Justified"],
        geracao: 4
    },
    {
        nome: "Greninja",
        tipo: ["Water", "Dark"],
        altura_m: 1.5,
        peso_kg: 40.0,
        habilidades: ["Torrent", "Protean"],
        geracao: 6
    },
    {
        nome: "Tyranitar",
        tipo: ["Rock", "Dark"],
        altura_m: 2.0,
        peso_kg: 202.0,
        habilidades: ["Sand Stream", "Unnerve"],
        geracao: 2
    },
    {
        nome: "Metagross",
        tipo: ["Steel", "Psychic"],
        altura_m: 1.6,
        peso_kg: 550.0,
        habilidades: ["Clear Body", "Light Metal"],
        geracao: 3
    },
    {
        nome: "Infernape",
        tipo: ["Fire", "Fighting"],
        altura_m: 1.2,
        peso_kg: 55.0,
        habilidades: ["Blaze", "Iron Fist"],
        geracao: 4
    },
    {
        nome: "Salamence",
        tipo: ["Dragon", "Flying"],
        altura_m: 1.5,
        peso_kg: 102.6,
        habilidades: ["Intimidate", "Moxie"],
        geracao: 3
    },
    {
        nome: "Zoroark",
        tipo: ["Dark"],
        altura_m: 1.6,
        peso_kg: 81.1,
        habilidades: ["Illusion"],
        geracao: 5
    },
    {
        nome: "Aegislash",
        tipo: ["Steel", "Ghost"],
        altura_m: 1.7,
        peso_kg: 53.0,
        habilidades: ["Stance Change"],
        geracao: 6
    },
    {
        nome: "Dragapult",
        tipo: ["Dragon", "Ghost"],
        altura_m: 3.0,
        peso_kg: 50.0,
        habilidades: ["Clear Body", "Infiltrator", "Cursed Body"],
        geracao: 8
    },
    {
        nome: "Excadrill",
        tipo: ["Ground", "Steel"],
        altura_m: 0.7,
        peso_kg: 40.4,
        habilidades: ["Sand Rush", "Sand Force", "Mold Breaker"],
        geracao: 5
    }
];

function insertPokemon(pokemon) {
    db.prepare(`
        INSERT INTO pokemons (nome, tipo, altura_m, peso_kg, habilidades, geracao)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(
        pokemon.nome,
        JSON.stringify(pokemon.tipo),
        pokemon.altura_m,
        pokemon.peso_kg,
        JSON.stringify(pokemon.habilidades),
        pokemon.geracao
    );
    }

    const count = db.prepare("SELECT COUNT(*) as total FROM pokemons").get();

    if (count.total === 0) {
        pokemons.forEach(insertPokemon);
        console.log("Banco populado!");
    }