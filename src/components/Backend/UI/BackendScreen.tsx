import "./BackendScreen.scss";
import FileHandler from "../Firebase/FileHandler";
import ImageContainer from "./ImageContainer";

const BackendScreen = () => {
  return (
    <div className="backend">
      <FileHandler />
      <ImageContainer />
    </div>
  );
};

export default BackendScreen;
