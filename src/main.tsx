import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import BoardController from "./MVC/Controller/SudokuController.tsx";
import Menu from "./routes/home.tsx";
import YourSudoku from "./routes/yourSudoku.tsx";

const router = createBrowserRouter([
  {
    path: "Game",
    element: <BoardController />,
  },
  {
    path: "/",
    element: <Menu />,
  },
  {
    path: "buildYourOwn",
    element: <YourSudoku />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
