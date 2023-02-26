import { StorageReference, deleteObject, getDownloadURL, getMetadata, listAll, ref, uploadBytesResumable } from "firebase/storage";
import { createContext, useEffect, useState } from "react";
import storage from "../components/Backend/Firebase/FireBaseConfig";

export type ImageDataType = {
  downloadPath: string;
  title: string | undefined;
  description: string | undefined;
  ref: StorageReference;
};

type ImageDataContextType = {
  handleUpload: (e: any, file: any, title: string, description: string) => Promise<void>;
  percent: number;
  imageData: ImageDataType[];
  deleteImage: (ref: any) => void;
  zeroPercent: () => void;
};

const ImageDataContext = createContext<ImageDataContextType>({
  percent: 0,
  imageData: [],
  handleUpload: async () => {},
  deleteImage: () => {},
  zeroPercent: () => {},
});

export const ImageDataContextProvider = (props: any) => {
  const [percent, setPercent] = useState<number>(0);
  const [imageData, setImageData] = useState<ImageDataType[]>([]);

  //UPLOAD
  const createRef = (file: any) => {
    return ref(storage, `/${file.name}`);
  };

  const zeroPercent = () => {
    setPercent(0);
  };

  const handleUpload = (e: any, file: any, title: string, description: string) => {
    console.log("🚀 ~ file: ImageDataContext.tsx:42 ~ handleUpload ~ file", file);
    // Create a new Promise that resolves when the upload is complete
    return new Promise<void>((resolve, reject) => {
      e.preventDefault();

      if (!file) {
        alert("Please choose a file first!");
        reject("No file chosen");
        return;
      }

      if (!title || !description) {
        alert("Please enter a title and description!");
        reject("Missing title or description");
        return;
      }

      const metadata = { customMetadata: { imageTitle: title, imageDescription: description } };
      let storageRef: StorageReference;
      storageRef = createRef(file);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPercent(percent);
        },
        err => {
          console.log(err);
          reject(err);
        },
        async () => {
          const file = uploadTask.snapshot.ref;
          const tempMetadata = await getMetadata(file);
          const tempDownloadLink = await getDownloadURL(file);
          const tempData = {
            downloadPath: tempDownloadLink,
            title: tempMetadata.customMetadata?.imageTitle,
            description: tempMetadata.customMetadata?.imageDescription,
            ref: file,
          };
          setImageData(prevState => {
            return [...prevState, tempData];
          });
          resolve();
        }
      );
    });
  };

  //DELETE
  const deleteImage = (ref: any) =>
    deleteObject(ref)
      .then(() => {
        const updatedItems = imageData.filter(image => image.ref.name !== ref.name);
        setImageData(updatedItems);
        // File deleted successfully
      })
      .catch(error => {
        // Uh-oh, an error occurred!
      });

  //FETCH
  const fetchImageData = async () => {
    setImageData([]);
    const downloadRef = ref(storage);
    const allImageInfo = await listAll(downloadRef);
    const tempImageData = [];
    for (const file of allImageInfo.items) {
      const tempFullPath = ref(storage, file.fullPath);
      const tempMetadata = await getMetadata(tempFullPath);
      const tempDownloadLink = await getDownloadURL(tempFullPath);
      const tempData = {
        downloadPath: tempDownloadLink,
        title: tempMetadata.customMetadata?.imageTitle,
        description: tempMetadata.customMetadata?.imageDescription,
        ref: tempFullPath,
      };
      tempImageData.push(tempData);
    }
    tempImageData.reverse();
    setImageData(tempImageData);
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  const imageDataContext = { percent, imageData, handleUpload, deleteImage, zeroPercent };

  return <ImageDataContext.Provider value={imageDataContext}>{props.children}</ImageDataContext.Provider>;
};

export default ImageDataContext;
