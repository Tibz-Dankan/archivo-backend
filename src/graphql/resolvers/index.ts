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
import { folderQueries, folderMutations } from "./folder";

const resolvers = {
  Query: {
    ...userQueries,
    ...fileQueries,
    ...folderQueries,
  },

  Upload: GraphQLUpload,

  Mutation: {
    ...userMutations,
    ...fileMutations,
    ...folderMutations,
  },
};

export default resolvers;
