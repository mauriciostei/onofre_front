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

# Copiamos archivos de Angular a Nginx (Angular genera los archivos en browser/)
COPY --from=build /app/dist/onofre_front/browser /usr/share/nginx/html

# Configuración de Nginx para SPA (routing Angular)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80 (nginx escucha en 80 según nginx.conf)
EXPOSE 80

# Arrancar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]