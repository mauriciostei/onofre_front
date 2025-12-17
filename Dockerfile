# =====================
# Etapa 1: Build
# =====================
FROM node:20-alpine AS build

WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiamos el resto del proyecto
COPY . .

# Opcional: si quieres inyectar variables antes de build
# ENV API_URL=http://mi-api:8080
# RUN sed -i "s|http://localhost:8080|${API_URL}|g" src/environments/env.ts

# Build de Angular
RUN npm run build -- --output-path=dist --configuration=production

# =====================
# Etapa 2: Servidor estático
# =====================
FROM nginx:alpine

# Copiamos build de Angular al contenedor de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos configuración de Nginx si quieres (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Exponemos puerto
EXPOSE 80

# Arranca Nginx
CMD ["nginx", "-g", "daemon off;"]