FROM node:14-alpine

WORKDIR /app
ADD . .

EXPOSE 3000

RUN npm install

ENTRYPOINT ["npm", "start"]