FROM mhart/alpine-node:16

WORKDIR /app
COPY package.json .
RUN npm install --only=prod && cd src/db && npx prisma generate
COPY . .

CMD ["npm", "start"]   