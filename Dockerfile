# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve
FROM nginx:1.27-alpine
ENV API_UPSTREAM=http://backend:3000
ENV CHAT_API_UPSTREAM=http://20.96.244.74/api/rag-application-demo1
COPY --from=build /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 8080
