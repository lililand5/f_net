FROM node:16

WORKDIR /f_net

COPY . .

CMD ["npm", "start"]
