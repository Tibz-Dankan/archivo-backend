import { finished } from "stream/promises";
import { Upload } from "../../../utils/upload";
import { RandomNumber } from "../../../utils/random";
import { AppError } from "../../../utils/error";
import { File } from "../../../db/models";
import { FileInterface } from "../../../db/models/file";

const file = new File();

const fileFolderId = async (upload: any) => {
  let id: string = "";
  const { folderId, subFolderId } = await upload.file;

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

    const { createReadStream, filename } = await clientUpload.file;
    const { folderId, subFolderId, path } = await clientUpload.file;

    // some file validations
    // TODO: validate path
    if (!path) {
      new AppError("please supply the file path!", 400).badUserInput();
    }
    const userId = context.id; //TODO: get id after verifying user
    const name: string = filename;
    const fileSystemName = `${new RandomNumber().d4()}_${filename}`;
    console.log("fileSystemName");
    console.log(fileSystemName);

    const stream = createReadStream();
    const filePath = `files/${path}/${fileSystemName}`;

    const upload = await new Upload(filePath).add(stream);

    console.log("url");
    console.log(upload?.url);

    const url = upload?.url;

    await finished(stream);

    const fileObj: FileInterface = {
      name: name,
      systemName: fileSystemName,
      url: url,
      path: filePath,
      ownerId: userId,
      folderId: folderId && fileFolderId(clientUpload),
      subFolderId: subFolderId && fileFolderId(clientUpload),
    };

    const newFile = await file.create(fileObj);

    // return { filename, mimetype, encoding };
    return newFile;
  },
  //   createUser: async (_, args) => {},
  //   updateUser: async (_, args) => {},
  //   updatePassword: async (_, args) => {},
};

export default fileMutations;
