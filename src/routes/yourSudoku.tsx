import { useState } from "react";
import { useNavigate } from "react-router-dom";

function YourSudoku() {
  const [yourBoardSize, setYourBoardSize] = useState(0);
  const [board, setBoard] = useState([]);
  const navigate = useNavigate();

  function handleBoardSizeChange(event) { 
    setYourBoardSize(parseInt(event.target.value));
  }

  function createBoard() {
    const newBoard = Array.from({ length: yourBoardSize }, () =>
      Array.from({ length: yourBoardSize }, () => -1)
    );
    setBoard(newBoard);
  }

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div>
      <header> Build your own Sudoku</header>
      <div>
        <label htmlFor="boardSize">Select board size: </label>
        <select id="boardSize" value={yourBoardSize} onChange={handleBoardSizeChange}>
          <option value={0} disabled>Select size</option>
          <option value={4}>4</option>
          <option value={9}>9</option>
          <option value={16}>16</option>
        </select>
      </div>
      <button onClick={createBoard} disabled={yourBoardSize === 0}>Create</button>
      <button onClick={navigateHome}>Menu</button>

      {board.length > 0 && (
        <div>
          <h2>Your Sudoku Board:</h2>
          <table>
            <tbody>
              {board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default YourSudoku;

