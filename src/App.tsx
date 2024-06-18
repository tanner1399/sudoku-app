import { Routes, Route } from "react-router-dom";
import BoardController from "./MVC/Controller/SudokuController";
import MenuController from "./MVC/Controller/HomeController.tsx";
import YourSudoku from "./routes/yourSudoku";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuController />} />
        <Route path="/" element={<BoardController />} />
        <Route path="/" element={<YourSudoku />} />
      </Routes>
    </>
  );
}

export default App;
