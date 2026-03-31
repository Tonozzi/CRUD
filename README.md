## Nome: Alanis Marques Tonozzi

## Introdução

Este projeto contém uma aplicação React criada com Create React App para gerenciar um catálogo de séries com operações de CRUD. A aplicação permite listar, buscar, cadastrar, editar e excluir séries consumindo a API REST `serieJournal-api`.

A rota inicial já abre diretamente a aplicação, com foco no catálogo. As instruções de uso e execução ficam documentadas neste README.

## Tecnologias utilizadas

- React
- React Router DOM
- Axios
- React-Bootstrap
- Jest e Testing Library
- Cypress

## Funcionalidades

- Listagem de séries a partir da API
- Busca dinâmica na listagem
- Cadastro de nova série
- Edição de série por rota dinâmica
- Exclusão de série
- Feedback visual de carregamento, sucesso e erro
- Testes automatizados dos fluxos principais

## Rotas da aplicação

- `/` exibe o catálogo de séries
- `/series` exibe o catálogo de séries
- `/series/nova` exibe o formulário de cadastro
- `/series/:id/editar` exibe o formulário de edição

## Como executar

Para executar o projeto completo, rode backend e frontend em terminais separados.

### 1. Backend

Clone o repositório da disciplina, caso ainda não tenha feito isso:

```bash
git clone https://github.com/adsPucrsOnline/DesenvolvimentoFrontend.git
```

Entre na pasta da API:

```bash
cd DesenvolvimentoFrontend/serieJournal-api
```

Instale as dependências e inicie o servidor:

```bash
npm install
npm start
```

A API ficará disponível em:

```text
http://localhost:5000
```

### 2. Frontend

No diretório deste projeto, instale as dependências:

```bash
npm install
```

Depois inicie a aplicação:

```bash
npm start
```

O frontend ficará disponível em:

```text
http://localhost:3000
```

## Build de produção

Para gerar a build:

```bash
npm run build
```

Para servir a build localmente:

```bash
npx serve -s build
```

## Testes

O projeto mantém testes em duas camadas:

- Jest + Testing Library para testes de interface em nível de componente/página
- Cypress para testes E2E dos fluxos happy path

### Arquivos de teste

- `src/App.test.js`: testes de interface com Jest
- `src/setupTests.js`: configuração do ambiente de testes com `jest-dom`
- `cypress/e2e/series-happy-path.cy.js`: testes E2E com Cypress
- `cypress/support/commands.js`: comandos auxiliares reutilizados pelo Cypress
- `cypress/fixtures/series.json`: dados base usados nos cenários E2E

### Testes com Jest

Executa os testes de interface com mocks do serviço da API:

```bash
npm test -- --watchAll=false
```

Cobertura atual do Jest:

- renderização do catálogo na rota inicial
- listagem, busca e exclusão
- cadastro de série
- edição de série

### Testes com Cypress

Os testes Cypress usam `cy.intercept()` para simular os endpoints da API e cobrir:

- catálogo com estado vazio
- listagem e busca
- navegação pela navbar
- cadastro de série
- edição de série
- exclusão de série
- página 404

Cobertura atual do Cypress:

- layout principal e navegação
- estado vazio do catálogo
- listagem com dados
- busca na listagem
- cadastro completo pelo formulário
- edição completa pelo formulário
- exclusão pela listagem
- retorno da página 404 para o catálogo

Para abrir o Cypress em modo interativo:

```bash
npm run cypress:open
```

Para executar em modo headless com o frontend já rodando em `http://localhost:3000`:

```bash
npm run cypress:run
```

Para subir o frontend automaticamente em uma porta dedicada e rodar toda a suíte E2E:

```bash
npm run test:e2e
```


## Integração com a API

A aplicação consome os seguintes endpoints da `serieJournal-api`:

- `GET /series`
- `GET /series/:id`
- `POST /series`
- `PUT /series`
- `DELETE /series/:id`

Os dados utilizados pela API seguem o formato:

```json
{
  "id": 1,
  "title": "Dark",
  "seasons": 3,
  "releaseDate": "2017-12-01",
  "director": "Baran bo Odar",
  "production": "Netflix",
  "category": "Sci-Fi/Mystery",
  "watchedAt": "2024-02-08"
}
```

## Estrutura do projeto

- `src/components`: componentes reutilizáveis de navegação, formulário e listagem
- `src/pages`: páginas principais da aplicação
- `src/services`: camada de comunicação com a API usando Axios
- `src/utils`: funções auxiliares de validação e formatação

## Componentes principais

- `AppLayout`
  - Responsável pela estrutura base da aplicação e renderização do conteúdo roteado.

- `NavBar`
  - Responsável pela navegação principal entre catálogo e cadastro.

- `SerieForm`
  - Responsável pelo formulário de cadastro e edição, incluindo validação dos campos.

- `SerieList`
  - Responsável por exibir os cards das séries e disponibilizar as ações de editar e excluir.

## Decisões de desenvolvimento

- A rota inicial foi definida como o catálogo para que a aplicação abra diretamente no fluxo principal.
- A comunicação com a API foi isolada em uma camada de serviço com Axios.
- A interface foi organizada com React Router para separar listagem, cadastro e edição.
- A estilização foi feita com React-Bootstrap e complementada com CSS customizado.

## Conclusão

Este projeto foi desenvolvido para demonstrar conceitos fundamentais de desenvolvimento frontend com React, incluindo componentização, roteamento, consumo de API REST, validação de formulário, renderização dinâmica de listas e testes automatizados, mantendo uma estrutura simples, objetiva e próxima de um fluxo real de aplicação.
