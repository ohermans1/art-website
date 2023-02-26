import { Outlet } from "react-router-dom";
import Footer from "../components/Frontend/UI/Footer";
import Header from "../components/Frontend/UI/Header";

const Nav = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Nav;
