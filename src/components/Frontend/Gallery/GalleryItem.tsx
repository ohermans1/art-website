import { useEffect, useState } from "react";
import { ImageDataType } from "../../../store/ImageDataContext";
import "./GalleryItem.scss";

const GalleryItem = (props: { row: string; column: string; imageProps: ImageDataType }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [gridSize, setGridSize] = useState({ row: 0, column: 0 });

  useEffect(() => {
    getImageSize();
    calculateGridSize();
  }, [props.imageProps.downloadPath]);

  const getImageSize = () => {
    const img = new Image();
    img.src = props.imageProps.downloadPath;
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      setSize({ width: naturalWidth, height: naturalHeight });
    };
  };

  const calculateGridSize = () => {
    if (size.height > size.width) {
      setGridSize({ row: 2, column: 1 });
    }
    if (size.height < size.width) {
      setGridSize({ row: 1, column: 2 });
    }
  };

  return (
    <figure className="gallery-item" style={{ gridRow: `span ${gridSize.row}`, gridColumn: `span ${gridSize.column}` }}>
      <img className="gallery-item__image" src={props.imageProps.downloadPath} alt={"An image of " + props.imageProps.title} />;
    </figure>
  );
};

export default GalleryItem;
