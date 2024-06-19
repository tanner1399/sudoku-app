import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import BoardController from "./mvc/controller/sudoku_controller.tsx";
import MenuController from "./mvc/controller/home_controller.tsx";

const router = createBrowserRouter([
  {
    path: "Game",
    element: <BoardController />,
  },
  {
    path: "/",
    element: <MenuController />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
