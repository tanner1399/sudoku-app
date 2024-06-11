import { Routes, Route } from "react-router-dom";
import Root from "./routes/home";
import BoardController from "./MVC/Controller/SudokuController";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/" element={<BoardController />} />
      </Routes>
    </>
  );
}

export default App;
