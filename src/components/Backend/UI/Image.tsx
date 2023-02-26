import { useContext, useState } from "react";
import "./Image.scss";
import ImageDataContext from "../../../store/ImageDataContext";
import { updateMetadata } from "firebase/storage";
import storage from "../Firebase/FireBaseConfig";

const Image = (props: any) => {
  const imageData = useContext(ImageDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.data.title);
  const [description, setDescription] = useState(props.data.description);

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleDelete = () => {
    imageData.deleteImage(props.data.ref);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(props.data.title);
    setDescription(props.data.description);
  };

  const handleSave = (e: any) => {
    // Create file metadata to update
    const newMetadata = {
      customMetadata: { imageTitle: title, imageDescription: description },
    };

    // Update metadata properties
    updateMetadata(props.data.ref, newMetadata)
      .then(metadata => {
        setIsEditing(false);
      })
      .catch(error => {});
  };

  return (
    <div className="image">
      <div className="image__picture-container">
        <img src={props.data.downloadPath} alt={`${props.data.title} image`} className="image__picture" />
      </div>
      <div className="image__content-group">
        <h3>Title:</h3>
        {!isEditing ? <div className="image__title">{title}</div> : <input className="image__input" value={title} title="title" onChange={handleTitle} />}
        <h3>Description:</h3>
        {!isEditing ? <div className="image__description">{description}</div> : <textarea className="image__input" value={description} title="description" onChange={handleDescription} />}

        {!isEditing ? (
          <div className="image__button-group">
            <button className="image__edit-button" onClick={handleDelete}>
              Delete
            </button>
            <button
              className="image__edit-button"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="image__button-group">
            <button className="image__edit-button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="image__edit-button" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;
