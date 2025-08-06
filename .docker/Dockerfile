FROM node:18

WORKDIR /connecting-minds-socket

COPY . /connecting-minds-socket

RUN ls -la

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]