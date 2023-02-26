import { useContext, useEffect, useState } from "react";
import "./Gallery.scss";
import GalleryItem from "./GalleryItem";
import ImageDataContext from "../../../store/ImageDataContext";

const Gallery = () => {
  const imageData = useContext(ImageDataContext);
  const [imageArray, setImageArray] = useState(imageData.imageData.reverse());
  useEffect(() => {
    const reversedImageData = [...imageData.imageData].reverse();
    setImageArray(reversedImageData);
  }, [imageData.imageData]);

  console.log("🚀 ~ file: Gallery.tsx:9 ~ Gallery ~ imageArray", imageArray);
  return (
    <div className="gallery">
      {imageArray.map((image, i) => {
        return <GalleryItem key={i + "image"} row="1 / span 2" column="1 / span 2" imageProps={image} />;
      })}
    </div>
  );
};

export default Gallery;
