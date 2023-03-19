import { join, resolve } from "path";
import { readdirSync, readFileSync } from "fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";

const dirName = resolve("./src/graphql");

const gqlFiles = readdirSync(join(dirName, "./typedefs"));

let typeDefs = "";

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(dirName, "./typedefs", file), {
    encoding: "utf8",
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
