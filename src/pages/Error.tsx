import Footer from "../components/Frontend/UI/Footer";
import Header from "../components/Frontend/UI/Header";
import "./Error.scss";

const Error = () => {
  return (
    <>
      <Header />
      <div className="error">
        <h1>Whoops... Looks like I can't find this page</h1>
        <p>Click on one of the menu links above to get back on track</p>
      </div>
      <Footer />
    </>
  );
};

export default Error;
