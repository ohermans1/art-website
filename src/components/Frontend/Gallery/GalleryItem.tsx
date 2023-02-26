import { ImageDataType } from "../../../store/ImageDataContext";
import "./GalleryItem.scss";

const GalleryItem = (props: { row: string; column: string; imageProps: ImageDataType }) => {
  const row = props.row;
  const column = props.column;

  return (
    <figure className="gallery-item" style={{ gridRow: row, gridColumn: column }}>
      <img className="gallery-item__image" src={props.imageProps.downloadPath} alt={"An image of " + props.imageProps.title} />;
    </figure>
  );
};

export default GalleryItem;
