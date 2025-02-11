# 1️⃣ Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2️⃣ Export Build Files (Nginx 없이)
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/build .
CMD ["echo", "React build completed."]
