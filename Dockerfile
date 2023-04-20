FROM mhart/alpine-node:16

WORKDIR /app

COPY package.json .

RUN npm install --only=prod

COPY . .

WORKDIR  /src/db

RUN  npx prisma generate

WORKDIR /app

CMD ["npm", "start"]   