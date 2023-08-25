FROM node:16

WORKDIR /f_net

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
