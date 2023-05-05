import { finished } from "node:stream/promises";
import { Upload } from "../../../utils/upload";
import { RandomNumber } from "../../../utils/random";
import { AppError } from "../../../utils/error";
import { File } from "../../../db/models";
import { FileInterface } from "../../../db/models/file";

const file = new File();

const fileFolderId = async (upload: any) => {
  let id: string = "";
  const { folderId, subFolderId } = await upload;

  if (!folderId && !subFolderId) {
    new AppError("please supply file path!", 400).badUserInput();
  }
  if (!subFolderId) {
    if (!folderId) {
      new AppError("please supply  folder id!", 400).badUserInput();
    }
    id = folderId;
  }
  if (!folderId) {
    if (!subFolderId) {
      new AppError("please supply subfolder id!", 400).badUserInput();
    }
    id = subFolderId;
  }

  if (id) return id;
};

const fileMutations = {
  singleUpload: async (_: any, clientUpload: any, context: any) => {
    // TODO: verify  user here
    console.log("context");
    console.log(context);

    console.log(clientUpload);

    const { createReadStream, filename } = await clientUpload.file;
    const { folderId, subFolderId } = await clientUpload;
    const path = clientUpload.path;
    const ownerId = clientUpload.ownerId;

    if (!path) {
      new AppError("please supply the file path!", 400).badUserInput();
    }
    if (!ownerId) {
      new AppError("please supply the ownerId!", 400).badUserInput();
    }
    const name: string = filename;
    const fileSystemName = `${new RandomNumber().d4()}_${filename}`;

    // TODO: To add userId to filePath
    const stream = createReadStream();
    const filePath = `files/${path}/${fileSystemName}`;

    const upload = await new Upload(filePath).add(stream);

    const url = upload?.url;

    await finished(stream);

    const fileObj: FileInterface = {
      name: name,
      systemName: fileSystemName,
      url: url,
      path: filePath,
      ownerId: ownerId,
      folderId: folderId && (await fileFolderId(clientUpload)),
      subFolderId: subFolderId && (await fileFolderId(clientUpload)),
    };
    console.log(fileObj);

    const newFile = await file.create(fileObj);

    return newFile;
  },
  //   createUser: async (_, args) => {},
  //   updateUser: async (_, args) => {},
  //   updatePassword: async (_, args) => {},
};

export default fileMutations;
