FROM  node:16-bullseye-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD [ "node", "index.js" ]