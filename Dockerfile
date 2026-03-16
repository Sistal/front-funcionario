# ============================================
# ETAPA 1: Build de la aplicación
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci --only=production=false

# Copiar código fuente
COPY . .

# Build de la aplicación
# Las variables de entorno se inyectarán en runtime, no en build time
RUN npm run build

# ============================================
# ETAPA 2: Imagen de producción con Nginx
# ============================================
FROM nginx:alpine

# Instalar dependencias necesarias para el script
RUN apk add --no-cache bash

# Copiar archivos construidos desde la etapa de build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar script de entrypoint para inyección de variables en runtime
COPY entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Crear archivo de configuración inicial vacío
RUN touch /usr/share/nginx/html/env-config.js

# Exponer puerto
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Usar el script de entrypoint para inyectar variables y arrancar nginx
ENTRYPOINT ["/docker-entrypoint.sh"]

