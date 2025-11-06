# Equipe

* Eike Fabrício da Silva (efs57@aluno.ifal.edu.br)
* Marina Medeiros Correia de Paffer (mmcp1@aluno.ifal.edu.br)

O sistema selecionado foi o de aplicação de testes, como aplicação do projeto de proficiência na disciplina de Programação Web. 

## Tecnologias Utilizadas

### Core

- **Node.js** - Runtime JavaScript
- **Express 5.1.0** - Framework web

### Banco de Dados

- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM 0.44.7** - ORM TypeScript-first
- **Drizzle Kit 0.31.6** - Ferramenta CLI para migrações

### Autenticação e Segurança

- **jsonwebtoken 9.0.2** - Geração e validação de tokens JWT
- **bcryptjs 3.0.2** - Hash de senhas
- **helmet 8.1.0** - Middleware de segurança HTTP

### Validação

- **Zod 4.1.12** - Validação de schemas

### Outras Dependências

- **dotenv 17.2.3** - Gerenciamento de variáveis de ambiente
- **tsx 4.20.6** - Executor TypeScript com hot reload

## Estrutura do Projeto

```
.
├── @types/
│   └── index.d.ts              # Definições de tipos customizadas
├── src/
│   ├── db/
│   │   └── schema.ts           # Schema do banco de dados
│   ├── users/
│   │   ├── auth/
│   │   │   ├── middleware.ts   # Middleware de autenticação
│   │   │   ├── router.ts       # Rotas de autenticação
│   │   │   └── token.ts        # Utilidades JWT
│   │   ├── controller.ts       # Controladores de usuário
│   │   ├── router.ts           # Rotas de usuário
│   │   ├── service.ts          # Lógica de negócio
│   │   └── validator.ts        # Schemas de validação
│   ├── error.ts                # Middleware de tratamento de erros
│   └── index.ts                # Ponto de entrada da aplicação
├── drizzle.config.ts           # Configuração do Drizzle ORM
└── package.json
```

### Instalação

```bash
# Instalar dependências
pnpm install

# Aplicar migrações do banco de dados
pnpm drizzle:push

# Executar em modo desenvolvimento
pnpm run:dev
```
