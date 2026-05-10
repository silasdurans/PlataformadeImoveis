# Plataforma Imobiliária — São Paulo Participações

> Projeto acadêmico desenvolvido no 1º ciclo do curso de Engenharia de Computação.
> Plataforma de busca de imóveis comerciais com busca semântica via IA local (Ollama).

---

## Sobre

Este projeto foi desenvolvido em grupo como trabalho prático da faculdade.
O objetivo era aplicar conceitos de desenvolvimento web moderno: arquitetura
de componentes, integração com IA local e design responsivo.

**Não está em desenvolvimento ativo.** Leia `STATUS.md` para mais detalhes.

**Stack principal:** React 19 · TypeScript 5 · Tailwind CSS v4 · Vite 5 · Express · SQLite

---

## Funcionalidades

- Busca semântica via Ollama (modelo local qwen2.5:3b)
- Chatbot de suporte para navegação e agendamento
- Filtros avançados por categoria de imóvel
- Painel administrativo com gestão de imóveis e agendamentos
- Design responsivo com animações via Framer Motion

---

## Como rodar

**Pré-requisitos:** Node.js 18+, Git
**Opcional (para IA):** Ollama instalado localmente

```bash
# Clone e instale
git clone https://github.com/silasdurans/plataforma-imobiliaria-react.git
cd plataforma-imobiliaria-react
npm install

# Rode apenas o frontend
npm run dev

# Rode com backend + IA
npm run dev:full
```

Frontend: http://localhost:5173
Backend API: http://localhost:3001
Admin: http://localhost:5173/admin/login

---

## Configuração do ambiente

Copie o arquivo de exemplo e ajuste as variáveis:

```bash
cp backend/.env.example backend/.env
```

```env
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5:3b
ADMIN_EMAIL=admin@saopauloparticipacoes.com.br
ADMIN_PASSWORD=sua_senha_aqui
PORT=3001
```

> Se o Ollama não estiver disponível, a busca usa fallback local automaticamente.

---

## Estrutura do projeto

```
src/
├── app/
│   ├── components/   # layout/, common/, ui/, figma/
│   ├── pages/        # Home, Results, PropertyDetail, Admin
│   ├── data/         # mock de propriedades
│   └── lib/          # aiSearch, clientSession, etc
├── styles/           # CSS global, tema, Tailwind
└── main.tsx

backend/
├── server.js         # API Express
├── properties.db     # banco SQLite local
└── .env.example
```

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Frontend (sem backend) |
| `npm run dev:full` | Frontend + backend com IA |
| `npm run dev:ai` | Apenas backend com IA |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

---

## Painel administrativo

URL: `http://localhost:5173/admin/login`

Configure as credenciais em `backend/.env` antes de usar.

---

## Licença

MIT — veja o arquivo [LICENSE](./LICENSE) para detalhes.
