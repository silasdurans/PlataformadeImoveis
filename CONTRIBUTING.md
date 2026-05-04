# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o **Plataforma Imobiliária**! Estamos sempre buscando melhorias e novas funcionalidades.

---

## 📋 Como Contribuir

### 1. **Abra uma Issue Primeiro**
Antes de começar a trabalhar, abra uma issue descrevendo:
- O que você quer implementar
- Por que é importante
- Como você planeja fazer

Isso evita duplicação de esforço.

### 2. **Fork o Repositório**
```bash
# Crie seu próprio fork em GitHub
# Depois clone localmente
git clone https://github.com/SEU_USUARIO/PlataformadeImoveis.git
cd PlataformadeImoveis
```

### 3. **Crie uma Branch**
```bash
git checkout -b feature/sua-feature
# ou para bugs:
git checkout -b fix/seu-bug
```

### 4. **Faça suas Mudanças**

#### Convenções de Código
- **React Components:** PascalCase (`Header.tsx`, `PropertyCard.tsx`)
- **Utilities:** camelCase (`formatDate.ts`, `apiHelpers.ts`)
- **CSS Files:** kebab-case (`theme.css`, `fonts.css`)

#### Exemplo de Component
```typescript
// ✅ BOM
export default function PropertyCard({ property }: Props) {
  return (
    <div className="property-card">
      {/* conteúdo */}
    </div>
  );
}

// ❌ RUIM
export const propertycard = () => {
  return <div>{/* conteúdo */}</div>;
};
```

### 5. **Commit com Mensagens Claras**

Use o padrão **Conventional Commits**:

```bash
# Features
git commit -m "feat: adicionar filtro por localização"

# Bugs
git commit -m "fix: corrigir busca com IA"

# Documentação
git commit -m "docs: atualizar guia de setup"

# Estilos
git commit -m "style: formatar código PropertyCard"

# Refator
git commit -m "refactor: reorganizar estrutura de componentes"

# Testes
git commit -m "test: adicionar testes para aiSearch"

# Performance
git commit -m "perf: otimizar carregamento de imagens"
```

### 6. **Push e Abra uma Pull Request**
```bash
git push origin feature/sua-feature
```

Depois abra um PR no GitHub com:
- Descrição clara do que foi feito
- Link para a issue relacionada
- Screenshots (se for UI)
- Testes (se aplicável)

---

## ✅ Checklist Antes de Submeter

- [ ] Código segue as convenções do projeto
- [ ] Não há credenciais expostas
- [ ] `.env` não foi commitado
- [ ] Testes passam (se existirem)
- [ ] README atualizado (se necessário)
- [ ] Mensagem de commit é descritiva
- [ ] Sem `console.log()` em produção

---

## 🔍 Processo de Review

1. Um mantenedor vai revisar seu PR
2. Pode haver comentários e pedidos de mudanças
3. Faça os ajustes necessários
4. Assim que aprovado, seu PR será mesclado!

---

## 🏗️ Desenvolvimento Local

### Setup
```bash
npm install
npm run dev          # Frontend
npm run dev:full     # Frontend + Backend
```

### Build
```bash
npm run build
npm run preview
```

### Debugging Backend
```bash
npm run dev:ai        # Com suporte IA
npm run dev:ai:strict # IA obrigatória
```

---

## 📝 Áreas de Contribuição

### 🎨 **Frontend**
- Novos componentes React
- Melhorias de UX/UI
- Animações com Framer Motion
- Responsividade

### 🔧 **Backend**
- Endpoints da API
- Integração com banco de dados
- Otimizações Ollama/IA
- Autenticação

### 📚 **Documentação**
- README
- Guias de setup
- Comentários de código
- Exemplos de uso

### 🐛 **Bugs**
- Encontrou um bug? Abra uma issue!
- Corrija e submeta um PR

---

## 💡 Ideias de Features

Algumas áreas que aceitamos contribuições:

- [ ] Temas claro/escuro completos
- [ ] Internacionalização (i18n)
- [ ] Testes unitários
- [ ] Otimizações de performance
- [ ] Melhor acessibilidade (a11y)
- [ ] Integração com Google Maps
- [ ] Notificações por email
- [ ] Sistema de favoritos avançado

---

## 🤔 Dúvidas?

- Abra uma **Discussion** no GitHub
- Envie um email: contato@spparticipacoes.com.br
- Verifique as **Issues** existentes

---

## 📜 Código de Conduta

Por favor, leia nosso [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) antes de contribuir.

---

**Obrigado por melhorar este projeto! 🚀**
