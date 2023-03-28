import { SubFolder } from "../../../db/models";
import { AppError } from "../../../utils/error";

const subFolder = new SubFolder();

const subFolderMutations = {
  createSubFolder: async (_: any, args: any) => {
    const name = args.name;
    const ownerId = args.ownerId;
    const subFolderParentId = args.parentId;

    args.subFolderParentId = subFolderParentId;
    delete args["parentId"];

    if (!name || !ownerId || !subFolderParentId) {
      new AppError("please fill out all fields!", 400).badUserInput();
    }
    const newSubFolder = await subFolder.create(args);

    return newSubFolder;
  },

  deleteSubFolder: async (_: any, args: any) => {
    const id: string = args.id;
    if (!id) {
      new AppError("Please provide folder id!", 400).badUserInput();
    }
    const currentSubFolder = await subFolder.findById(id);
    console.log("currentFolder");
    console.log(currentSubFolder);
    if (currentSubFolder) {
      new AppError("Can't delete folder with content!", 403).forbidden();
    }

    await subFolder.delete(id);
    return { message: "Folder deleted successfully!", status: "success" };
  },
};

export default subFolderMutations;
