const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());

let pokemons = [
    {
        id: 1,
        nome: "Gyarados",
        tipo: ["Water", "Flying"],
        altura_m: 6.5,
        peso_kg: 235.0,
        habilidades: ["Intimidate", "Moxie"],
        geracao: 1
    },
    {
        id: 2,
        nome: "Golisopod",
        tipo: ["Bug", "Water"],
        altura_m: 2.0,
        peso_kg: 108.0,
        habilidades: ["Emergency Exit"],
        geracao: 7
    },
    {
        id: 3,
        nome: "Charizard",
        tipo: ["Fire", "Flying"],
        altura_m: 1.7,
        peso_kg: 90.5,
        habilidades: ["Blaze", "Solar Power"],
        geracao: 1
    },
    {
        id: 4,
        nome: "Garchomp",
        tipo: ["Dragon", "Ground"],
        altura_m: 1.9,
        peso_kg: 95.0,
        habilidades: ["Sand Veil", "Rough Skin"],
        geracao: 4
    },
    {
        id: 5,
        nome: "Aggron",
        tipo: ["Steel", "Rock"],
        altura_m: 2.1,
        peso_kg: 360.0,
        habilidades: ["Sturdy", "Rock Head", "Heavy Metal"],
        geracao: 3
    },
    {
        id: 6,
        nome: "Ceruledge",
        tipo: ["Fire", "Ghost"],
        altura_m: 1.6,
        peso_kg: 62.0,
        habilidades: ["Flash Fire", "Weak Armor"],
        geracao: 9
    },
    {
        id: 7,
        nome: "Rillaboom",
        tipo: ["Grass"],
        altura_m: 2.1,
        peso_kg: 90.0,
        habilidades: ["Overgrow", "Grassy Surge"],
        geracao: 8
    },
    {
        id: 8,
        nome: "Absol",
        tipo: ["Dark"],
        altura_m: 1.2,
        peso_kg: 47.0,
        habilidades: ["Pressure", "Super Luck", "Justified"],
        geracao: 3
    },
    {
        id: 9,
        nome: "Revavroom",
        tipo: ["Steel", "Poison"],
        altura_m: 1.8,
        peso_kg: 120.0,
        habilidades: ["Overcoat", "Filter"],
        geracao: 9
    },
    {
        id: 10,
        nome: "Kingdra",
        tipo: ["Water", "Dragon"],
        altura_m: 1.8,
        peso_kg: 152.0,
        habilidades: ["Swift Swim", "Sniper", "Damp"],
        geracao: 2
    }
];

let nextId = pokemons.length + 1;

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
})

app.get("/", (req, res) => {
    res.send('Olá')
})

app.get("/pokemons", (req, res) => {
    let resultado = pokemons;
    console.log(req.query);
    const { tipo, geracao, pesoMax, pesoMin, nome, altMax, altMin, habilidades } = req.query;

    if (tipo) {
        resultado = resultado.filter(p =>
            p.tipo.some(t => t.toLowerCase() === tipo.toLowerCase())
    );
    }

    if (habilidades) {
        resultado = resultado.filter(p =>
            p.habilidades.some(t => t.toLowerCase() === habilidades.toLowerCase())
        );
    }

    if (geracao) {
        resultado = resultado.filter(p =>
            p.geracao === parseInt(geracao)
    );
    }

    if (pesoMax) {
        resultado = resultado.filter(p =>
            p.peso_kg <= parseFloat(pesoMax)
    );
    }

    if (pesoMin) {
        resultado = resultado.filter(p =>
            p.peso_kg >= parseFloat(pesoMin)
        )
    }

    if (nome) {
        resultado = resultado.filter(p =>
            p.nome.toLowerCase().includes(nome.toLowerCase())
    );
    }

    if (altMax) {
        resultado = resultado.filter(p =>
            p.altura_m <= parseFloat(altMax)
        )
    }

    if (altMin) {
        resultado = resultado.filter(p =>
            p.altura_m >= parseFloat(altMin)
        )
    }

    if (resultado.length === 0) {
        return res.status(404).json({
            mensagem: "Nenhum pokemon encontrado com esses filtros"
        })
    }

    res.json(resultado);
});

app.post("/pokemons", (req, res) => {
    const body = req.body
    const novoPokemon = {
        id: nextId,
        nome: body.nome,
        tipo: body.tipo,
        altura_m: body.altura_m,
        peso_kg: body.peso_kg,
        habilidades: body.habilidades,
        geracao: body.geracao
    }

    nextId++;

    pokemons.push(novoPokemon);

    res.status(201).json({
        mensagem: "Pokemon criado com sucesso",
        pokemon: novoPokemon
    });
});

app.put("/pokemons/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const body = req.body;

    const index = pokemons.findIndex( p =>{
        return p.id === id;
    });

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Pokemon não encontrado"
        });
    }

    if (body.nome) pokemons[index].nome = body.nome;
    if (body.tipo) pokemons[index].tipo = body.tipo;
    if (body.altura_m) pokemons[index].altura_m = body.altura_m;
    if (body.peso_kg) pokemons[index].peso_kg = body.peso_kg;
    if (body.habilidades) pokemons[index].habilidades = body.habilidades;
    if (body.geracao) pokemons[index].geracao = body.geracao;

    res.json({
        mensagem: "Pokemon atualizado com sucesso",
        pokemon: pokemons[index]
    });
});

app.delete("/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = pokemons.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Pokemon não encontrado"
        });
    }

    const pokemonRemovido = pokemons[index];

    pokemons.splice(index, 1);

    res.json({
        mensagem: "Pokemon removido com sucesso",
        pokemon: pokemonRemovido
    });
});