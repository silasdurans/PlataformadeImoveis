# 🏢 Plataforma Imobiliária - Grupo São Paulo Participações

Plataforma moderna de imóveis comerciais com IA, construída com React, TypeScript e Tailwind CSS v4.

---

## 📁 Estrutura de Arquivos Organizada

### 🎨 **CSS** (`/src/styles/`)
Arquivos de estilo globais e tema customizado:
```
/src/styles/
├── fonts.css       → Importação de fontes
├── index.css       → Estilos base
├── tailwind.css    → Configuração Tailwind v4
└── theme.css       → Tema customizado (cores, tokens)
```

### ⚛️ **TypeScript/React** (`/src/app/`)

#### 📦 **Componentes** (`/src/app/components/`)
```
/src/app/components/
├── 📁 layout/              → Componentes de Layout
│   ├── Header.tsx          → Cabeçalho principal
│   ├── Footer.tsx          → Rodapé
│   └── index.ts            → Exports centralizados
│
├── 📁 common/              → Componentes Reutilizáveis
│   ├── PropertyCard.tsx    → Card de imóvel
│   ├── InstitutionalBanner.tsx → Banner do Grupo SP
│   └── index.ts            → Exports centralizados
│
├── 📁 features/            → Funcionalidades Específicas
│   ├── AIAgent.tsx         → Agente de IA (chatbot flutuante)
│   └── Chatbot.tsx         → Chatbot auxiliar
│
├── 📁 ui/                  → Componentes UI Base
│   └── ...                 → Botões, inputs, etc.
│
└── 📁 figma/               → Componentes do Figma
    └── ImageWithFallback.tsx → (Protegido - não editar)
```

#### 📄 **Páginas** (`/src/app/pages/`)
```
/src/app/pages/
├── Home.tsx                → Página inicial
├── Results.tsx             → Listagem de imóveis
├── PropertyDetail.tsx      → Detalhes do imóvel
├── AdminLogin.tsx          → Login administrativo
└── AdminDashboard.tsx      → Painel administrativo
```

#### 📊 **Dados** (`/src/app/data/`)
```
/src/app/data/
└── properties.ts           → Mock de propriedades
```

---

## 🔄 Como Importar Arquivos

### ✅ **Imports Corretos**

```typescript
// ========================================
// Layout Components
// ========================================
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
// Ou usando o index:
import { Header, Footer } from "./components/layout";

// ========================================
// Common Components
// ========================================
import { PropertyCard } from "./components/common/PropertyCard";
import { InstitutionalBanner } from "./components/common/InstitutionalBanner";
// Ou usando o index:
import { PropertyCard, InstitutionalBanner } from "./components/common";

// ========================================
// Feature Components
// ========================================
import { AIAgent } from "./components/AIAgent";
import { Chatbot } from "./components/Chatbot";

// ========================================
// Pages
// ========================================
import Home from "./pages/Home";
import Results from "./pages/Results";
import PropertyDetail from "./pages/PropertyDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// ========================================
// Data
// ========================================
import { properties } from "./data/properties";
```

---

## 🚀 Tecnologias

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização utilitária
- **Motion (Framer Motion)** - Animações fluidas
- **React Router** - Roteamento SPA
- **Lucide React** - Ícones modernos
- **Vite** - Build tool ultra-rápida

---

## 📝 Convenções de Nomenclatura

### **Arquivos TypeScript/React**
- **PascalCase** para componentes: `Header.tsx`, `PropertyCard.tsx`
- **camelCase** para utilities: `formatDate.ts`, `apiHelpers.ts`

### **Arquivos CSS**
- **kebab-case**: `fonts.css`, `theme.css`

### **Pastas**
- **kebab-case ou singular**: `layout/`, `common/`, `features/`

---

## 🔐 Painel Administrativo

**URL:** `/admin/login`

**Credenciais de Demonstração:**
```
Email: admin@saopauloparticipacoes.com.br
Senha: admin123
```

---

## 🎯 Funcionalidades

### ✨ **Principais**
- 🤖 **Agente de IA Conversacional** - Busca inteligente por linguagem natural
- 🔍 **Filtros Ultra Avançados** - 8 categorias de filtros (tipo, preço, área, etc.)
- 📊 **Painel Administrativo** - Dashboard completo para gestão
- 🏢 **Banner Institucional** - Apresentação do Grupo São Paulo
- 📱 **Design Responsivo** - Mobile-first
- 🎨 **Animações Fluidas** - Motion (Framer Motion)
- ⚡ **Performance** - Carregamento otimizado

### 🎨 **Design**
- Glassmorphism
- Gradientes vibrantes
- Sombras elaboradas
- Micro-interações
- Dark/Light mode ready

---

## 📂 Benefícios da Organização

### ✅ **Manutenibilidade**
- Fácil localização de arquivos por tipo
- Estrutura escalável e padronizada
- Separação clara de responsabilidades

### ✅ **DX (Developer Experience)**
- Navegação intuitiva entre arquivos
- Imports mais claros e diretos
- Facilita trabalho em equipe

### ✅ **Performance**
- Tree-shaking otimizado
- Lazy loading facilitado
- Builds mais rápidos

---

## 🗂️ Mapeamento de Arquivos Principais

| Tipo | Pasta | Descrição |
|------|-------|-----------|
| **CSS** | `/src/styles/` | Estilos globais e tema |
| **Componentes Layout** | `/src/app/components/layout/` | Header, Footer |
| **Componentes Comuns** | `/src/app/components/common/` | Cards, Banners |
| **Funcionalidades** | `/src/app/components/features/` | AIAgent, Chatbot |
| **Páginas** | `/src/app/pages/` | Rotas da aplicação |
| **Dados** | `/src/app/data/` | Mocks e dados estáticos |
| **Assets** | `/src/imports/` | Imagens e SVGs |

---

## 🔗 Links Importantes

- **Site Institucional:** https://saopauloparticipacoes.com.br/
- **Painel Admin:** `/admin/login`
- **Página Inicial:** `/`
- **Busca de Imóveis:** `/resultados`

---

## 📧 Contato

**Grupo São Paulo Participações**
- 📍 Av. São Luís, 100 - São Paulo, SP
- 📞 +55 (11) 3000-0000
- ✉️ contato@spparticipacoes.com.br

---

**© 2026 São Paulo Participações. Todos os direitos reservados.**
