# Etapa 1: Build del proyecto Angular
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos todo el proyecto
COPY . .

# Build en modo producción
RUN npm run build -- --configuration=production

# Etapa 2: Imagen mínima con Nginx para servir Angular
FROM nginx:alpine

# Copiamos los archivos build de Angular a Nginx
COPY --from=build /app/dist/onofre_front /usr/share/nginx/html

# Copiamos configuración de Nginx personalizada (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos puerto
EXPOSE 80

# Arranque de Nginx en foreground
CMD ["nginx", "-g", "daemon off;"]