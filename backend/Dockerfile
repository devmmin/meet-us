# Step 1
## base image for Step 2: Node 10-alpine(light weight)
FROM node:16.15.0-alpine3.15
WORKDIR /app
## Step 1의 builder에서 build된 프로젝트를 가져온다
COPY . .
## application 실행
CMD ["npm", "run", "start:prod"]

EXPOSE 3000