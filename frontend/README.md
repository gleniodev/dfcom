#  Sistema de Gestão de Produtos e Avaliações - Frontend

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


