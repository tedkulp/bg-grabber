FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production --no-package-lock

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
