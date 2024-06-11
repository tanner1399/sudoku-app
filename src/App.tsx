import { Routes, Route } from "react-router-dom";
import BoardController from "./MVC/Controller/SudokuController";
import Menu from "./routes/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/" element={<BoardController />} />
      </Routes>
    </>
  );
}

export default App;
