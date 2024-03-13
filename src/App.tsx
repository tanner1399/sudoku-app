import { Routes, Route } from "react-router-dom";
import ScaleBoard from "./components/scaleBoard";
import Root from "./routes/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/" element={<ScaleBoard />} />
      </Routes>
    </>
  );
}

export default App;
