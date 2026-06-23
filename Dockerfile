# =============================================
# Dockerfile — Portfólio Imobiliário (Angular SPA)
# =============================================

# Stage 1: Build da aplicação Angular
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (melhora cache de layers)
COPY package*.json ./

# Instala dependências de forma limpa e reproducível
RUN npm ci

# Copia o restante do código-fonte
COPY . .

# Executa o build de produção
RUN npm run build

# Stage 2: Servir com Nginx
FROM nginx:alpine

# Copia os arquivos estáticos gerados pelo Angular
COPY --from=builder /app/dist/portifolio-imob/browser /usr/share/nginx/html

# Copia a configuração customizada do Nginx (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
