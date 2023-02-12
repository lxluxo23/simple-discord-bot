FROM  node:16-bullseye-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN apt update
RUN apt install ffmpeg -y 
CMD [ "node", "index.js" ]