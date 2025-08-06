FROM node:18

WORKDIR /#

COPY . /#

RUN ls -la

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]