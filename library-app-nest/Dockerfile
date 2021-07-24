FROM node:16.2
WORKDIR /app
ENV PORT=3000

COPY ./package*.json ./
RUN npm install
COPY ./dist ./
EXPOSE 3000

CMD ["node", "main.js"]
