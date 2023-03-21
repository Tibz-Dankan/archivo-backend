import { finished } from "stream/promises";
import { Upload } from "../../../utils/upload";

const fileMutations = {
  singleUpload: async (_: any, uploadObj: any, context: any) => {
    console.log("context");
    console.log(context);

    const file = uploadObj.file;

    const { createReadStream, filename, mimetype, encoding } = await file;

    const stream = createReadStream();
    const filePath = `files/${Date.now()}-${filename}`;

    const upload = await new Upload(filePath).add(stream);

    console.log("upload");
    console.log(upload);

    console.log("url");
    console.log(upload?.url);

    await finished(stream);

    return { filename, mimetype, encoding };
  },
  //   createUser: async (_, args) => {},
  //   updateUser: async (_, args) => {},
  //   updatePassword: async (_, args) => {},
};

export default fileMutations;

// // file upload using graphql upload

// const express = require("express");
// const { ApolloServer, gql } = require("apollo-server-express");
// const {
//   GraphQLUpload,
//   graphqlUploadExpress, // A Koa implementation is also exported.
// } = require("graphql-upload");
// // const { finished } = require('stream/promises');
// const {
//   ApolloServerPluginLandingPageLocalDefault,
// } = require("apollo-server-core");

// const typeDefs = gql`
//   # The implementation for this scalar is provided by the
//   # 'GraphQLUpload' export from the 'graphql-upload' package
//   # in the resolver map below.
//   scalar Upload

//   type File {
//     filename: String!
//     mimetype: String!
//     encoding: String!
//   }

//   type Query {
//     # This is only here to satisfy the requirement that at least one
//     # field be present within the 'Query' type.  This example does not
//     # demonstrate how to fetch uploads back.
//     otherFields: Boolean!
//   }

//   type Mutation {
//     # Multiple uploads are supported. See graphql-upload docs for details.
//     singleUpload(file: Upload!): File!
//   }
// `;

// const resolvers = {
//   // This maps the `Upload` scalar to the implementation provided
//   // by the `graphql-upload` package.
//   Upload: GraphQLUpload,

//   Mutation: {
//     singleUpload: async (parent, { file }) => {
//       const { createReadStream, filename, mimetype, encoding } = await file;

//       // Invoking the `createReadStream` will return a Readable Stream.
//       // See https://nodejs.org/api/stream.html#stream_readable_streams
//       const stream = createReadStream();

//       // This is purely for demonstration purposes and will overwrite the
//       // local-file-output.txt in the current working directory on EACH upload.
//       const out = require("fs").createWriteStream("local-file-output.txt");
//       stream.pipe(out);
//       await finished(out);

//       return { filename, mimetype, encoding };
//     },
//   },
// };

// async function startServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     // Using graphql-upload without CSRF prevention is very insecure.
//     csrfPrevention: true,
//     cache: "bounded",
//     plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
//   });
//   await server.start();

//   const app = express();

//   // This middleware should be added before calling `applyMiddleware`.
//   app.use(graphqlUploadExpress());

//   server.applyMiddleware({ app });

//   await new Promise<void>((r) => app.listen({ port: 4000 }, r));

//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// }

// startServer();