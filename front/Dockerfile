# 사용할 베이스 이미지
FROM node:18-alpine

# 작업 디렉토리 생성
WORKDIR /app

# 앱의 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 환경 변수 설정
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_PUBLIC_API_URL http://k8b203.p.ssafy.io:8080
ENV NEXT_PUBLIC_KAKAO http://k8b203.p.ssafy.io:8080/oauth2/authorization/kakao

# 컨테이너 포트 오픈
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]
