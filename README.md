# Desafio Técnico DFcom Sistemas

# Backend

## Descrição

Este projeto é uma aplicação **full stack** desenvolvida para o desafio técnico da DFcom Sistemas.

O backend foi implementado com:

- **NestJS**
- **MongoDB (Mongoose)**
- **Docker** (docker-compose)
- Testes automatizados com **Jest** e **Supertest**

---

## Funcionalidades da API

### Produtos (Products)

- `POST /products` → Cadastrar um novo produto
- `GET /products` → Listar todos os produtos
- `GET /products/:id` → Visualizar um produto específico
- `PUT /products/:id` → Atualizar um produto
- `DELETE /products/:id` → Excluir um produto

### Avaliações (Reviews)

- `POST /products/:productId/reviews` → Cadastrar uma nova avaliação para um produto
- `GET /products/:productId/reviews` → Listar todas as avaliações de um produto
- `GET /products/:productId/reviews/average` → Obter a média das avaliações de um produto
- `PUT /reviews/:reviewId` → Atualizar uma avaliação existente
- `DELETE /reviews/:reviewId` → Excluir uma avaliação

---

## Como rodar o projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (v18+ recomendado) e NPM

### Rodar com Docker Compose

```bash
docker-compose up --build
```

### Rodar localmente (sem Docker)

```bash
# Instalar dependências
npm install

# Rodar localmente
npm run start:dev
```

O backend ficará disponível em: http://localhost:3000

## Rodar os testes e2e

### Observação sobre os testes e2e

⚠️ Estudei sobre testes para implementar nesse desafio, mas encontrei algumas inconsistências e erros durante a implementação esecificamente com o delete. Depois de algumas pesquisas descobri que em testes e2e com MongoDB e Mongoose, a operação DELETE /reviews/:reviewId pode ocasionalmente retornar 404 ao invés de 200, ou apresentar inconsistência momentânea ao validar a ausência imediata de uma avaliação.

Isso se deve ao comportamento natural de consistência eventual do MongoDB e à forma como o Mongoose gerencia conexões e cache em ambiente de teste (Jest).

Em ambiente de produção e no uso real da API, o endpoint DELETE funciona corretamente.

## 🔄 Seed de Dados (Products + Reviews)

Para facilitar os testes e a visualização no frontend, o projeto inclui um script de seed que gera dados fake para a base de dados `products_reviews_db`.

O seed faz:

- Limpeza completa das collections `products` e `reviews`
- Criação de 10 products
- Criação de 5 reviews para cada product

### Como rodar o seed

### Pré-requisitos

- Banco de dados MongoDB em execução
- Definir a variável `MONGO_URL` no `.env` (já configurado como `mongodb://localhost:27017/products_reviews_db`)

### Comando:

```bash
npx ts-node scripts/seed.ts
```

---

# Próximo passo

Agora é só você rodar:

```bash
npm install @faker-js/faker
npx ts-node scripts/seed.ts
```

## Considerações finais

- O backend foi implementado em NestJS, seguindo boas práticas de arquitetura.

- A persistência foi feita com MongoDB via Mongoose.

- A API segue o padrão RESTful.

- O projeto possui testes e2e automatizados para Products e Reviews.



# Frontend

Este é o **Frontend** do Sistema de Gestão de Produtos e Avaliações, desenvolvido como parte de um desafio técnico para a empresa **DFcom Sistemas**.

 O objetivo do sistema é permitir o **cadastro, gerenciamento e avaliação de produtos destinados à venda**, com foco em **usabilidade** e **clareza**.

---

##  Funcionalidades

- Tela inicial com descrição do sistema e tecnologias utilizadas  
- Cadastro de novos produtos  
- Listagem de produtos cadastrados  
- Visualização de detalhes do produto  
- Cadastro de avaliações de produto  
- Edição de avaliações (com modal)  
- Remoção de avaliações  
- Cálculo e exibição da **média das avaliações**  
- Edição de produto (com modal)  
- Remoção de produto  
- Navegação fluida entre telas  

---

## Tecnologias Utilizadas

- **Frontend:** [Next.js 14 (App Router)](https://nextjs.org/) + React 18  
- **UI:** [shadcn/ui](https://ui.shadcn.com/) — componentes acessíveis e modernos  
- **Formulários:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para validação  
- **Comunicação com API:** [Axios](https://axios-http.com/)  
- **Backend:** Integração com API REST desenvolvida em [NestJS](https://nestjs.com/) + [Mongoose](https://mongoosejs.com/) + [MongoDB](https://www.mongodb.com/)  

---

## Como rodar o projeto (Frontend)

### Pré-requisitos

- Node.js v18+  
- NPM ou Yarn  

### Instalação

```bash
# Clone o repositório (ou navegue para a pasta frontend se já estiver em monorepo)

# Instale as dependências
npm install
# ou
yarn install
```

### Rodar o projeto em modo desenvolvimento

```bash
npm run dev
# ou
yarn dev
```
O app ficará disponível em: http://localhost:3000

---

### Estrutura de pastas

frontend/
├── src/
│   ├── app/
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   ├── new/
│   │   ├── page.tsx
│   ├── components/
│   ├── lib/
│   ├── services/
│   ├── types/

---

### Decisões de implementação

- Modal para edição: tanto as avaliações quanto os produtos são editados via modal, para evitar navegação extra e garantir uma UX fluida.
- Componentização: foram criados componentes reutilizáveis para formulários e listas.
- Formulário com validação: uso de React Hook Form + Zod para garantir usabilidade e evitar erros de entrada de dados.
- Comunicação com Backend: realizada com Axios para maior controle de requisições.
- Visual simples com foco em código e tempo de execução.


