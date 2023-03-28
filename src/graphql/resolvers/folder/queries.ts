import { AppError } from "../../../utils/error";
import { Folder } from "../../../db/models";

const folder = new Folder();

const folderQueries = {
  findFolderById: async (_: any, args: any) => {
    const id = args.id;
    if (!id) {
      new AppError("please supply folder Id", 400).badUserInput();
    }
    const savedFolder = await folder.findById(id);

    return savedFolder;
  },

  findFolderByOwnerId: async (_: any, args: any) => {
    const ownerId = args.id;
    if (!ownerId) {
      new AppError("please supply your Id(userId)", 400).badUserInput();
    }
    const savedFolder = await folder.findByOwnerId(ownerId);

    return savedFolder;
  },
};

export default folderQueries;
