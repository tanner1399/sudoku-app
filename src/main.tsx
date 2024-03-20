import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/home.tsx";
import ScaleBoard from "./components/scaleBoard.tsx";
// import boardSize from "./components/scaleBoard.tsx";

const router = createBrowserRouter([
  {
    path: "Game",
    element: <ScaleBoard boardSize="" />,
  },
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
