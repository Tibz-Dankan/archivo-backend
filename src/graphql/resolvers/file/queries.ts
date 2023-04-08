import { AppError } from "../../../utils/error";
import { File } from "../../../db/models";

const file = new File();

const fileQueries = {
  findFileByFolderId: async (_: any, args: any) => {
    const folderId = args.id;
    if (!folderId) {
      new AppError("please supply folder Id", 400).badUserInput();
    }
    const savedFiles = await file.findByFolderId(folderId);

    return savedFiles;
  },
  findFileBySubFolderId: async (_: any, args: any) => {
    const subFolderId = args.id;
    if (!subFolderId) {
      new AppError("please supply folder Id", 400).badUserInput();
    }
    const savedFiles = await file.findBySubFolderId(subFolderId);

    return savedFiles;
  },
};

export default fileQueries;
