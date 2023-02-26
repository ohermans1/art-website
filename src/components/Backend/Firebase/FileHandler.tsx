import "./FileHandler.scss";
import { useContext, useEffect, useRef, useState } from "react";

import { getDownloadURL, getMetadata, list, listAll, ref, uploadBytesResumable } from "firebase/storage";
import storage from "./FireBaseConfig";
import ImageDataContext from "../../../store/ImageDataContext";

const FileHandler = () => {
  const imageData = useContext(ImageDataContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState({ height: "0", display: "none" });

  const toggleForm = () => {
    if (displayForm.display === "none") {
      setDisplayForm({ height: "100%", display: "flex" });
    } else {
      setDisplayForm({ height: "0", display: "none" });
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleDescription = (e: any) => {
    setDescription(prevState => {
      return (prevState = e.target.value);
    });
  };

  const handleTitle = (e: any) => {
    setTitle(prevState => {
      return (prevState = e.target.value);
    });
  };

  const handleUpload = async (e: any) => {
    setLoading(true);
    await imageData.handleUpload(e, file, title, description);
    setTitle("");
    setDescription("");
    setFile("");
    toggleForm();
    imageData.zeroPercent();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setLoading(false);
  };

  const submitEnabled = title && description && file;

  return (
    <div className="file-handler">
      <div className="file-handler__title-group" onClick={toggleForm}>
        <h2>Upload a new image</h2>
        <button className="file-handler__button">Expand</button>
      </div>
      <form action="" className="file-handler__form" style={displayForm}>
        <input name="upload" type="file" className="file-handler__file-input" ref={fileInputRef} onChange={handleFileChange} accept="/image/*" title={"Select your image"} />
        <label htmlFor="title">Title</label>
        <input type="text" className="file-handler__input" title="title" name="title" onChange={handleTitle} value={title} />
        <label htmlFor="Description">Description</label>
        <textarea rows={5} className="file-handler__input" title="description" name="Description" onChange={handleDescription} value={description} />
        <button onClick={handleUpload} className="file-handler__button" disabled={!submitEnabled || loading}>
          Upload Image
        </button>
        <div className="file-handler__progress-group">
          <div className="file-handler__progress-bar">
            <div className="file-handler__progress-bar-mask" style={{ width: imageData.percent + "%" }}>
              &nbsp;
            </div>
          </div>
          {imageData.percent}% Complete
        </div>
      </form>
    </div>
  );
};

export default FileHandler;
