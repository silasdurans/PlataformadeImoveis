# 🚀 Plataforma Imobiliária - Deploy

Projeto pronto para deploy em produção com todas as melhores práticas de segurança e qualidade.

## 📋 Checklist Pré-Deploy

### ✅ Segurança
- [x] Sem credenciais hardcoded
- [x] `.env` não versionado
- [x] ADMIN_PASSWORD em variável de ambiente
- [x] CORS configurado
- [x] XSS protection ativado

### ✅ Documentação
- [x] README atualizado
- [x] CONTRIBUTING.md criado
- [x] CODE_OF_CONDUCT.md criado
- [x] LICENSE (MIT) adicionado
- [x] .github templates criados

### ✅ Código
- [x] Build sem erros
- [x] TypeScript type-safe
- [x] Imports organizados
- [x] Git history completo

### ✅ Performance
- [x] Vite otimizado
- [x] Tree-shaking ativo
- [x] Lazy loading de rotas
- [x] Images otimizadas

---

## 🌐 Opções de Deploy

### 1. **Render (Recomendado - Já Configurado)**

```yaml
# render.yaml (já existe no projeto)
services:
  - type: web
    name: plataforma-imoveis
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: ADMIN_EMAIL
        value: admin@saopauloparticipacoes.com.br
      - key: ADMIN_PASSWORD
        fromService:
          type: env
          property: ADMIN_PASSWORD
```

**Deploy:**
1. Conecte seu GitHub ao Render
2. Selecione o repositório
3. Configure as variáveis de ambiente
4. Deploy automático em cada push

### 2. **Vercel (Alternativa)**

```bash
npm install -g vercel
vercel --prod
```

### 3. **Docker (Para qualquer lugar)**

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3001 5173

CMD ["npm", "run", "dev:full"]
```

---

## 🔐 Variáveis de Ambiente (Produção)

Configure estas no seu serviço de deploy:

```env
# Backend
ADMIN_EMAIL=admin@saopauloparticipacoes.com.br
ADMIN_PASSWORD=senhaSeguraAqui123!
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5:3b
PORT=3001
HOST=0.0.0.0

# Frontend (se necessário)
VITE_API_URL=https://sua-api.com
```

---

## 📊 Monitoramento

Após o deploy:

1. Teste endpoints da API
2. Verifique frontend carregando
3. Teste login admin
4. Monitore logs de erro

---

**Seu projeto está 100% pronto para produção! 🚀**
