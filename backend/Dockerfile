FROM node

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN ls -la /app

EXPOSE 5000

CMD ["npm", "start"]