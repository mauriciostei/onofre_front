# Etapa 1: Build de Angular
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./
RUN npm install

# Copiamos todo el proyecto
COPY . .

# Build de Angular en modo producción
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiamos archivos de Angular a Nginx
COPY --from=build /app/dist/onofre_front /usr/share/nginx/html

# Configuración de Nginx para SPA (routing Angular)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 4200
EXPOSE 4200

# Arrancar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]