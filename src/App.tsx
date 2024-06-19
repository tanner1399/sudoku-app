import { Routes, Route } from "react-router-dom";
import BoardController from "./MVC/controller/sudoku_controller";
import MenuController from "./MVC/controller/home_controller";
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
