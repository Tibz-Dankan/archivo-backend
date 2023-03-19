import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { deleteObject, uploadString, getDownloadURL } from "firebase/storage";
import dotenv from "dotenv";

dotenv.config();

export class Upload {
  firebaseStorage: any;
  fileDir: string;

  constructor(fileDirectory: string) {
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
    this.fileDir = fileDirectory;
  }

  filePath(fileDir: string) {
    const isProduction: boolean = process.env.NODE_ENV === "production";
    if (!fileDir) throw new Error("Please provide file directory");
    if (isProduction) return `prod/${fileDir}`;
    if (!isProduction) return `dev/${fileDir}`;
  }

  async add(fileBase64: string) {
    try {
      const reference = ref(this.firebaseStorage, this.filePath(this.fileDir));
      await uploadString(reference, fileBase64, "base64");
      const URL: string = await getDownloadURL(reference);
      return URL;
    } catch (err) {
      console.log("err", err);
    }
  }

  async update(fileBase64: string, savedFileDir: string) {
    try {
      let reference = ref(this.firebaseStorage, this.filePath(this.fileDir));
      await uploadString(reference, fileBase64, "base64");
      const URL: string = await getDownloadURL(reference);

      // delete the saved file
      reference = ref(this.firebaseStorage, this.filePath(savedFileDir));
      if (URL) {
        await deleteObject(reference);
      }
      return URL;
    } catch (err) {
      console.log("err", err);
    }
  }

  async delete() {
    try {
      const reference = ref(this.firebaseStorage, this.filePath(this.fileDir));
      await deleteObject(reference);
    } catch (err) {
      console.log("err", err);
    }
  }
}



// //upload blob or file directly from javascript File
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'some-child');

// // 'file' comes from the Blob or File API
// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });