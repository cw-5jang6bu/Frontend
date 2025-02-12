# 1️⃣ Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine as builder

# Copy app's source code to the /app directory
COPY . /app

# The application's directory will be the working directory
WORKDIR /app

# Install Node.js dependencies defined in '/app/packages.json'
RUN npm install

FROM node:20-alpine
COPY --from=builder /app /app
WORKDIR /app
ENV PORT 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]