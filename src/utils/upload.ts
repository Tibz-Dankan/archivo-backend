import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { deleteObject, uploadString, getDownloadURL } from "firebase/storage";
import dotenv from "dotenv";

dotenv.config();

interface UploadInterface {
  url: string;
}

export class Upload {
  private firebaseStorage: any;
  private filePath: string;
  upload: UploadInterface;

  constructor(filePath: string) {
    const firebaseConfig = {
      apiKey: process.env.API_KEY!,
      authDomain: process.env.AUTH_DOMAIN!,
      projectId: process.env.PROJECT_ID!,
      storageBucket: process.env.STORAGE_BUCKET!,
      messagingSenderId: process.env.MESSAGING_SENDER_ID!,
      appId: process.env.APP_ID!,
      measurementId: process.env.MEASUREMENT_ID!,
    };
    const firebaseApp = initializeApp(firebaseConfig);
    this.firebaseStorage = getStorage(firebaseApp);
    this.filePath = filePath;
    this.upload = { url: "" };
  }

  private async streamToBase64(stream: any) {
    const chunks = [];

    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("base64");
  }

  private path(filePath: string) {
    const isProduction: boolean = process.env.NODE_ENV === "production";
    if (!filePath) throw new Error("Please provide file directory");
    if (isProduction) return `prod/${filePath}`;
    if (!isProduction) return `dev/${filePath}`;
  }

  async add(stream: any) {
    try {
      const reference = ref(this.firebaseStorage, this.path(this.filePath));

      const fileBase64 = await this.streamToBase64(stream);

      await uploadString(reference, fileBase64, "base64");
      this.upload.url = await getDownloadURL(reference);

      return this.upload;
    } catch (err) {
      console.log("err", err);
    }
  }

  async update(stream: any, savedFilePath: string) {
    try {
      let reference = ref(this.firebaseStorage, this.path(this.filePath));
      const fileBase64 = await this.streamToBase64(stream);

      await uploadString(reference, fileBase64, "base64");
      const URL: string = await getDownloadURL(reference);

      // delete the saved file
      reference = ref(this.firebaseStorage, this.path(savedFilePath));
      if (URL) {
        await deleteObject(reference);
      }
      this.upload.url = URL;

      return this.upload;
    } catch (err) {
      console.log("err", err);
    }
  }

  async delete() {
    try {
      const reference = ref(this.firebaseStorage, this.path(this.filePath));
      await deleteObject(reference);
    } catch (err) {
      console.log("err", err);
    }
  }
}
