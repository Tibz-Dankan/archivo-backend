import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

import { userQueries, userMutations } from "./user";
import { fileQueries, fileMutations } from "./file";
import { folderQueries, folderMutations } from "./folder";
import { subFolderQueries, subFolderMutations } from "./subfolder";

const resolvers = {
  Query: {
    ...userQueries,
    ...fileQueries,
    ...folderQueries,
    ...subFolderQueries,
  },

  Upload: GraphQLUpload,

  Mutation: {
    ...userMutations,
    ...fileMutations,
    ...folderMutations,
    ...subFolderMutations,
  },
};

export default resolvers;
