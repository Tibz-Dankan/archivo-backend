import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import dotenv from "dotenv";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import schema from "./graphql/schema";
// import { keepActiveController } from "keep-apps-active";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(graphqlUploadExpress());

// keepActiveController(app);

const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

const gqlServer = new ApolloServer({
  schema,
  csrfPrevention: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await gqlServer.start();

app.use(cors(corsOptions), bodyParser.json(), expressMiddleware(gqlServer));

const startApp = async () => {
  try {
    await httpServer.listen({ port: PORT });
    console.log(`🚀  GraphQL server running at port: ${PORT}`);
  } catch (err: any) {
    console.log("Not able to run GraphQL server");
    console.log(err.message);
  }
};

startApp();
