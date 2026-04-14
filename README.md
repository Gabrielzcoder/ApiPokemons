# API de Pokémons

API REST desenvolvida com Node.js, Express e SQLite para gerenciamento de Pokémons, com autenticação JWT, filtros, relacionamentos e CRUD completo.

---

# Tecnologias utilizadas

* Node.js
* Express
* SQLite (better-sqlite3)
* JWT (jsonwebtoken)
* bcrypt

---

# 📦 Instalação

```bash
git clone <seu-repositorio>
cd api
npm install
```

---

# ▶️ Como rodar o projeto

```bash
node server.js
```

Servidor rodando em:

```
http://localhost:3000
```

---

# Funcionalidades

* CRUD completo de Pokémons
* Filtros por nome, tipo e geração
* Autenticação com JWT
* Relacionamento entre usuários e pokémons favoritos (JOIN)
* Proteção de rotas

---

# 🔐 Autenticação

## Criar usuário

```http
POST /usuarios
```

Body:

```json
{
  "nome": "frootz",
  "senha": "123"
}
```

---

## Login

```http
POST /login
```

Body:

```json
{
  "nome": "frootz",
  "senha": "123"
}
```

Resposta:

```json
{
  "token": "SEU_TOKEN"
}
```

---

## ⚠️ Uso do Token

Todas as rotas protegidas exigem:

```
Authorization: Bearer SEU_TOKEN
```

---

# Rotas de Pokémons

## Listar pokémons

```http
GET /pokemons
```

### Filtros:

```http
GET /pokemons?tipo=Water
GET /pokemons?geracao=1
GET /pokemons?nome=char
```

---

## Criar pokémon

```http
POST /pokemons
```

Body:

```json
{
  "nome": "Gyarados",
  "tipo": ["Water", "Flying"],
  "altura_m": 6.5,
  "peso_kg": 235,
  "habilidades": ["Intimidate", "Moxie"],
  "geracao": 1
}
```

---

## Atualizar pokémon

```http
PUT /pokemons/:id
```

---

## Deletar pokémon

```http
DELETE /pokemons/:id
```

---

# ⭐ Favoritos (ROTAS PROTEGIDAS)

## Adicionar favorito

```http
POST /favoritos
```

Header:

```
Authorization: Bearer SEU_TOKEN
```

Body:

```json
{
  "pokemon_id": 1
}
```

---

## Listar favoritos

```http
GET /usuarios/:id/favoritos
```

Header:

```
Authorization: Bearer SEU_TOKEN
```

---

# 🔗 Relacionamento

A API utiliza relacionamento entre tabelas:

* usuarios
* pokemons
* favoritos

Utilizando JOIN para buscar os favoritos de um usuário.

---

# Status Codes

* 200 → Sucesso
* 201 → Criado com sucesso
* 400 → Erro de requisição
* 401 → Não autenticado
* 403 → Token inválido
* 404 → Não encontrado
* 500 → Erro interno

---

# 📌 Observações

* O token JWT expira em 1 hora
* Senhas são armazenadas com hash (bcrypt)
* Dados de tipo e habilidades são armazenados em formato JSON

---

## 📮 Testes com Postman

Para testar a API:

1. Faça login na rota `/login`
2. Copie o token retornado
3. Utilize o token no header:

Authorization: Bearer SEU_TOKEN

4. Teste as rotas protegidas como `/favoritos` e `/usuarios/:id/favoritos`

---

# Autor
Gabriel Moreno
Projeto desenvolvido para fins acadêmicos.
