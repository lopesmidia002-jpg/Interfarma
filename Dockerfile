FROM node:20-alpine AS base

# Instalar dependências nativas para compilar better-sqlite3
RUN apk add --no-cache python3 make g++ sqlite

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências de produção
RUN npm install --omit=dev

# Copiar código-fonte da aplicação
COPY . .

# Criar diretórios persistentes e ajustar permissões
RUN mkdir -p /app/data /app/uploads /app/asserts

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --retries=3 --start-period=10s \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server/index.js"]
