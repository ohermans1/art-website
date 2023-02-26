import "./ImageContainer.scss";
import Image from "./Image";
import ImageDataContext from "../../../store/ImageDataContext";
import { useContext, useEffect, useState } from "react";

const ImageContainer = () => {
  const imageData = useContext(ImageDataContext);

  const [imageArray, setImageArray] = useState(imageData.imageData.reverse());

  useEffect(() => {
    const reversedImageData = [...imageData.imageData].reverse();
    setImageArray(reversedImageData);
  }, [imageData.imageData]);
  return (
    <div className="image-container">
      {imageArray.map((image, i) => {
        return <Image data={image} key={i+"admin"} />;
      })}
    </div>
  );
};

export default ImageContainer;
