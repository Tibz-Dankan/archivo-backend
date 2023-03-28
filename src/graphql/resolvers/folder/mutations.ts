import { Folder } from "../../../db/models";
import { AppError } from "../../../utils/error";

const folder = new Folder();

const folderMutations = {
  createFolder: async (_: any, args: any) => {
    const name = args.name;
    const ownerId = args.ownerId;

    if (!name || !ownerId) {
      new AppError("please fill out all fields!", 400).badUserInput();
    }
    const newFolder = await folder.create(args);

    return newFolder;
  },

  deleteFolder: async (_: any, args: any) => {
    const id: string = args.id;
    if (!id) {
      new AppError("Please provide folder id!", 400).badUserInput();
    }
    const currentFolder = await folder.findById(id);
    console.log("currentFolder");
    console.log(currentFolder);
    if (currentFolder) {
      new AppError("Can't delete folder with content!", 403).forbidden();
    }

    await folder.delete(id);
    return { message: "Folder deleted successfully!", status: "success" };
  },
};

export default folderMutations;

// ownerId UUD
// 67ffa57c-fda6-45cc-9304-0e9f12f01c65
// 3e4978ba-6bcb-4f1c-b0fb-f350e3fb0e25
// 3c00ae9a-06e8-4a24-86d9-41943b06adcc
// 6465fad3-531b-4708-8726-969d8d17138c
