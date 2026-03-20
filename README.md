# ApiPokemons

http://localhost:3000/ -> Página inicial da API retorna "Olá"
http://localhost:3000/pokemons/ -> Página que retorna o JSON com todos os pokemons adicionados
http://localhost:3000/pokemons?nome=:nome -> Busca o pokemon por nome e retorna se ele existir
http://localhost:3000/pokemons?tipo=:tipo -> Filtra os pokemons por tipo e retorna um lista com todos eles
http://localhost:3000/pokemons?pesoMax=:peso_kg -> Filtra os pokemons por peso máximo e retorna uma lista com todos eles
http://localhost:3000/pokemons?pesoMin=:peso_kg -> Filtra os pokemons por peso mínimo e retorna uma lista com todos eles
http://localhost:3000/pokemons?altMax=:altura_m -> Filtra os pokemons por altura máxima e retorna uma lista com todos eles
http://localhost:3000/pokemons?altMin=:altura_m -> Filtra os pokemons por altura mínima e retorna uma lista com todos eles
http://localhost:3000/pokemons?habilidade=:habilidade -> Filtra os pokemons por habilidade e retorna uma lista com todos eles
http://localhost:3000/pokemons?geracao=:geracao -> Filtra os pokemons por geraão e retorna uma lista com todos eles

Formato para guardar os pokemons:
    {
        "nome": nome,
        "tipo": tipo,
        "altura_m": altura_m,
        "peso_kg": peso_kg,
        "habilidades": habilidade,
        "geracao": geracao
    }

exemplo de requisição no postman:
    <img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/7a0d3e55-be74-4dc6-93d7-453fa320ced8" />

exemplo da api funcionando:
    <img width="640" height="577" alt="image" src="https://github.com/user-attachments/assets/a5e4de61-616e-406c-bc3e-5ee4ef137431" />

o codigo possui um sistema de verificação que analisa se após passar pela filtragem do método get, verifica se o tamanho da lista é retornada é 0, ou seja, não encontrou nenhum pokemon com aquelas informações, se for, retorna uma mensagem avisando isso ao usuário
