import { Routes, Route } from "react-router-dom";
import BoardRoute from "./routes/gameRoute";
import Root from "./routes/root";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/" element={<BoardRoute />} />
      </Routes>
    </>
  );
}

export default App;
