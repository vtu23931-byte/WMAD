FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# copy root static files
COPY ../index.html ../product.html ../css ./../css
COPY ../images ../images
EXPOSE 3000
CMD ["node", "server.js"]
