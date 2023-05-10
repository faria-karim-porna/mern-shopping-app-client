FROM node:18.16.0-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY ./ ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]
