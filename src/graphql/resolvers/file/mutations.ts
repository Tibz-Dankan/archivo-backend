import { finished } from "stream/promises";
import { Upload } from "../../../utils/upload";

const fileMutations = {
  singleUpload: async (_: any, uploadObj: any, context: any) => {
    console.log("context");
    console.log(context);

    const file = uploadObj.file;

    const { createReadStream, filename, mimetype, encoding } = await file;

    const stream = createReadStream();
    const filePath = `files/${Date.now()}-${filename}`;

    const upload = await new Upload(filePath).add(stream);

    console.log("upload");
    console.log(upload);

    console.log("url");
    console.log(upload?.url);

    await finished(stream);

    return { filename, mimetype, encoding };
  },
  //   createUser: async (_, args) => {},
  //   updateUser: async (_, args) => {},
  //   updatePassword: async (_, args) => {},
};

export default fileMutations;
