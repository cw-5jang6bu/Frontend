# 1단계: React 애플리케이션 빌드
FROM node:20 AS build
WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: NGINX로 빌드된 파일 서빙
FROM nginx:alpine

# 빌드된 정적 파일 복사
COPY --from=build /app/build /usr/share/nginx/html

# NGINX 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80 포트 노출
EXPOSE 80

# NGINX 실행
CMD ["nginx", "-g", "daemon off;"]
