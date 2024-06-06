# ENGWEB2024-Recurso

## Persistência de Dados
Os dados foram persistidos em uma base de dados MongoDB. O dataset foi limpo e formatado antes de ser importado para a base de dados.

## Setup das Bases de Dados
Para configurar a base de dados, utilizei os comandos do MongoDB para importar o dataset após a limpeza dos dados.

## Instruções de Execução
### Exercício 1
1. Navegue até a pasta `ex1`.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm start` para iniciar a aplicação.

### Exercício 2
1. Navegue até a pasta `ex2`.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm start` para iniciar a aplicação.

## Docker
Para executar ambos os serviços usando Docker:
1. Navegue até a pasta raiz do repositório.
2. Execute `docker-compose up -d`.

## Descrição das Rotas
- **GET /books**: Retorna todos os livros.
- **GET /books/:id**: Retorna um livro específico por ID.
- **POST /books**: Adiciona um novo livro.
- **DELETE /books/:id**: Deleta um livro por ID.
- **PUT /books/:id**
