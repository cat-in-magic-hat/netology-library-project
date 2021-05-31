FROM node:16.2
WORKDIR /app
ENV PORT=5000

COPY ./package*.json ./
RUN npm install
COPY ./src ./
EXPOSE 5000

CMD ["node", "index.js"]