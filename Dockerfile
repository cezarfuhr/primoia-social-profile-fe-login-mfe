# Stage 1: Build
FROM node:20-alpine as builder

# Definindo diretório de trabalho
WORKDIR /app

# Copiando arquivos de dependências
COPY package*.json ./

# Instalando dependências
RUN npm ci

# Copiando código fonte
COPY . .

# Gerando build de produção
RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine

# Copiando configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiando arquivos de build
COPY --from=builder /app/dist/login/browser /usr/share/nginx/html

# Expondo porta 4200
EXPOSE 4200

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"] 