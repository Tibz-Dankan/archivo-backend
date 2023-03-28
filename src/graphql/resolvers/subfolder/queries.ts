import { AppError } from "../../../utils/error";
import { SubFolder } from "../../../db/models";

const subFolder = new SubFolder();

const subFolderQueries = {
  findSubFolderById: async (_: any, args: any) => {
    const id = args.id;
    if (!id) {
      new AppError("please supply folder Id", 400).badUserInput();
    }
    const savedSubFolder = await subFolder.findById(id);

    return savedSubFolder;
  },

  findSubFolderByOwnerId: async (_: any, args: any) => {
    const ownerId = args.id;
    if (!ownerId) {
      new AppError("please supply your Id(userId)", 400).badUserInput();
    }
    const savedSubFolders = await subFolder.findByOwnerId(ownerId);

    return savedSubFolders;
  },

  findSubFolderByParentId: async (_: any, args: any) => {
    const parentId = args.id;
    if (!parentId) {
      new AppError("please supply your Id(userId)", 400).badUserInput();
    }
    const savedSubFolders = await subFolder.findByParentId(parentId);

    return savedSubFolders;
  },
};

export default subFolderQueries;
