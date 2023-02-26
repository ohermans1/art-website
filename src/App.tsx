import React, { useState } from "react";

import "./App.scss";
import Header from "./components/Frontend/UI/Header";
import Gallery from "./components/Frontend/Gallery/Gallery";
import Footer from "./components/Frontend/UI/Footer";

import FileHandler from "./components/Backend/Firebase/FileHandler";
import BackendScreen from "./components/Backend/UI/BackendScreen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Nav from "./pages/Nav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/rhadmin", element: <Admin /> },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
