# Kanban API

Sistema de gestão de tarefas em equipe (Kanban) desenvolvido com NestJS, Drizzle ORM e PostgreSQL.

## 🚀 Tecnologias

- **NestJS** (Framework)
- **TypeScript** (Linguagem)
- **Drizzle ORM** (Banco de Dados)
- **PostgreSQL** (Banco de Dados Docker)
- **Zod** (Validação)
- **Pino** (Logs)
- **Swagger** (Documentação)
- **Jest** (Testes)

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Copie `.env.example` para `.env`
   - Ajuste as credenciais se necessário (Docker já configurado para padrão)

## 🐳 Banco de Dados (Docker)

Inicie o container do PostgreSQL:

```bash
docker-compose up -d
```

Rode as migrações do banco:

```bash
npx drizzle-kit migrate
```

## ▶️ Execução

Modo de desenvolvimento:

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.
Swagger: `http://localhost:3000/docs`.

## 🧪 Testes

Rodar testes unitários:

```bash
npm run test
```

## 📐 Diagrama de Entidades

```mermaid
erDiagram
    BOARD ||--o{ DEPARTMENT : tem
    BOARD ||--o{ PRIORITY : tem
    BOARD ||--o{ TAG : tem
    BOARD ||--o{ NOTE : tem
    DEPARTMENT ||--o{ RESPONSIBLE : tem
    NOTE }o--o{ TAG : possui
    NOTE }o--o{ RESPONSIBLE : atribuido
    NOTE }o--|| PRIORITY : possui

    BOARD { uuid id, string name }
    DEPARTMENT { uuid id, string name, uuid board_id }
    PRIORITY { uuid id, int value, string description, uuid board_id }
    TAG { uuid id, string name, uuid board_id }
    RESPONSIBLE { uuid id, string name, string role, uuid department_id }
    NOTE { uuid id, string title, string content, timestamp due_date }
```
