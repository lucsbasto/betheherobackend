## Be The Hero

## Aplicação Backend do projeto Be The Hero :heart:

Aplicação onde pessoas com coração de heróis poderão realizar seus atos de bondade com as ONG's cadastradas! :two_hearts:

## Tecnologias Utilizadas :wrench:

- NodeJS
- Crypto
- Knex
- Sqlite3

## Rodando o projeto :bulb:

- git clone [https://github.com/lucsbasto/betheherobackend](https://github.com/lucsbasto/betheherobackend)
- yarn or npm install
- yarn dev or npm run dev

## API

- Disponível em [https://betheherobackend.herokuapp.com](https://betheherobackend.herokuapp.com)

## Rotas

- POST /login

  - Faz login na aplicação

- GET /ong/incidents

  - Busca casos especificos da ONG

- GET /ongs

  - Lista ONGs cadastradas

- POST /ongs

  - Cadastra uma ONG

- DELETE /ongs

  - Deleta a ONG logada

- POST /incidents

  - Cadastra um caso

- PUT /ongs

  - Edita a ONG logada

- GET /incidents

  - Lista todos os casos

- DELETE /incidents/:id
  - Delete um caso

#### Aplicação desenvolvida durante a Semana Omnistack 11.0 da [RocketSeat](https://github.com/Rocketseat)
