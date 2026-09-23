# Estágio de Build e Execução
FROM node:20-alpine

# Instalar dependências nativas para compilação do better-sqlite3
RUN apk add --no-cache python3 make g++ sqlite

# Definir diretório de trabalho
WORKDIR /app

# Copiar manifesto de dependências
COPY package*.json ./

# Instalar dependências de produção
RUN npm install --omit=dev

# Copiar todo o código-fonte da aplicação
COPY . .

# Criar pastas para persistência de dados e uploads
RUN mkdir -p data uploads

# Expor a porta padrão da aplicação
EXPOSE 3000

# Variáveis de ambiente padrão
ENV PORT=3000
ENV NODE_ENV=production
ENV DB_PATH=/app/data/intelfarma.sqlite

# Comando de inicialização
CMD ["npm", "start"]
