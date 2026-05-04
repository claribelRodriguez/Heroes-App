# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y construir
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servidor (Nginx)
FROM nginx:stable-alpine
# Copiar el build de Angular al directorio de Nginx
COPY --from=build /app/dist/superhero-app/browser /usr/share/nginx/html
# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
