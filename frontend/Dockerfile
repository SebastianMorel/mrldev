FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
RUN npm install -g serve
CMD ["sh", "-c", "serve -s build -l $PORT"]