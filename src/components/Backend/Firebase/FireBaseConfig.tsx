import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBQoe4cQ9cNRVQwbkL1kW-E8t_1YALDZD4",
  authDomain: "rolys-website-image-storage.firebaseapp.com",
  projectId: "rolys-website-image-storage",
  storageBucket: "rolys-website-image-storage.appspot.com",
  messagingSenderId: "112176040021",
  appId: "1:112176040021:web:ff418f3bd811f521df2cdc",
  measurementId: "G-7337PM6TQ3",
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
