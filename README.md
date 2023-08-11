# Archivo-backend

System to manage files in the cloud written in Nodejs, Typescript and Graphql

To get started, you need to have Node.js installed on your machine. If it's not, you can download and install it from [nodejs.org](https://nodejs.org).

## Get started

- First install dependencies by running `npm install` in the root directory.
- To start the backend run `npm run start`.

## Environment variables setup

In order to fully setup backend, you need to add following environment variables to your .env file

### General env vars

- `JWT_SECRETE_TOKEN` is the jsonwebtoken secret.
- `DATABASE_URL` is the url to your database. For this project the database is mysql.
- `FRONTEND_URL` is obtained after deploying the frontend

### Firebase config env vars

- `API_KEY `
- `AUTH_DOMAIN`
- `PROJECT_ID`
- `STORAGE_BUCKET`
- `MESSAGING_SENDER_ID`
- `APP_ID`
- `MEASUREMENT_ID`

To generate your own Firebase Cloud storage config variables follow this [article](https://javascript.plainenglish.io/uploading-an-image-to-firebase-cloud-storage-and-returning-url-with-express-nodejs-713daac7a5d4).
