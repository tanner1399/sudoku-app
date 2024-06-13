import { useNavigate } from "react-router-dom";

function YourSudoku() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };
  return (
    <div>
      <header> Build your own Sudoku</header>
      <p>Her er din side crissan</p>
      <button onClick={navigateHome}>Menu</button>
    </div>
  );
}

export default YourSudoku;
