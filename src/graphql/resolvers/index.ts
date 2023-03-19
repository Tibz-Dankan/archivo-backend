// // Graphql upload
// declare module "graphql-upload" {
//   export function processRequest<T>(
//     request: any,
//     response: any,
//     options?: any
//   ): Promise<T>;
// }

import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
// import { GraphQLUpload } from "graphql-upload/GraphQLUpload";
// import Upload from "graphql-upload/Upload";

import { userQueries, userMutations } from "./user";
import { fileQueries, fileMutations } from "./file";

const resolvers = {
  Query: {
    ...userQueries,
    ...fileQueries,
  },

  Upload: GraphQLUpload,

  Mutation: {
    ...userMutations,
    ...fileMutations,
  },
};

export default resolvers;
