import { Routes, Route } from "react-router-dom";
import BoardController from "./MVC/Controller/SudokuController";
import Menu from "./routes/home";
import YourSudoku from "./routes/yourSudoku";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/" element={<BoardController />} />
        <Route path="/" element={<YourSudoku />} />
      </Routes>
    </>
  );
}

export default App;
