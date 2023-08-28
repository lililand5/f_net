FROM node:16

WORKDIR /f_net

COPY . .

RUN npm install


CMD ["npm", "start"]
