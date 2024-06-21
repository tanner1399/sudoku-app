import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { eliminateSudoku } from "../game_logic/EliminationSolver2";

function YourSudoku() {
  const [yourBoardSize, setYourBoardSize] = useState(0);
  const [board, setBoard] = useState([]);
  const [yourBoard, setYourBoard] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  function handleBoardSizeChange(event) {
    setYourBoardSize(parseInt(event.target.value));
  }

  function createBoard() {
    const newBoard = Array.from({ length: yourBoardSize }, () =>
      Array.from({ length: yourBoardSize }, () => -1)
    );
    setBoard(newBoard);
    setIsLocked(false); // Unlock the board if creating a new one
  }

  function handleCellChange(rowIndex, cellIndex, event) {
    let newValue = event.target.value;
    if (newValue === '') {
      newValue = -1; // if the input is cleared, set the value to -1
    } else {
      newValue = parseInt(newValue);
      if (newValue < 1 || newValue > yourBoardSize) {
        return; // if the value is out of bounds, do nothing
      }
    }
    const newBoard = board.map((row, rIndex) =>
      row.map((cell, cIndex) =>
        rIndex === rowIndex && cIndex === cellIndex ? newValue : cell
      )
    );
    setBoard(newBoard);
  }

  function lockBoard() {
    setYourBoard(board);
    setIsLocked(true);
  }

  function solveSudoku() {
    const solvedBoard = eliminateSudoku(yourBoard);
    setBoard(solvedBoard);
  }

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div>
      <header>Build your own Sudoku</header>
      <div>
        <label htmlFor="boardSize">Select board size: </label>
        <select
          id="boardSize"
          value={yourBoardSize}
          onChange={handleBoardSizeChange}
          disabled={isLocked} // Disable size selection if the board is locked
        >
          <option value={0} disabled>
            Select size
          </option>
          <option value={4}>4x4</option>
          <option value={9}>9x9</option>
          <option value={16}>16x16</option>
          <option value={25}>25x25</option>
        </select>
      </div>
      <button onClick={createBoard} disabled={yourBoardSize === 0}>
        Create
      </button>
      <button onClick={lockBoard} disabled={isLocked || yourBoardSize === 0}>
        Lock
      </button>
      <button onClick={solveSudoku} disabled={!isLocked}>
        Solve
      </button>
      <button onClick={navigateHome}>Menu</button>

      {board.length > 0 && (
        <div>
          <h2>Your Sudoku Board:</h2>
          <table>
            <tbody>
              {board.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    (rowIndex + 1) % Math.sqrt(yourBoardSize) === 0
                      ? "bBorder"
                      : ""
                  }
                >
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} 
                    className={
                      (cellIndex + 1) % Math.sqrt(yourBoardSize) === 0
                        ? "rBorder"
                        : ""
                    }
                    >
                      <input
                        type="number"
                        value={cell === -1 ? '' : cell}
                        onChange={(event) => handleCellChange(rowIndex, cellIndex, event)}
                        min={1}
                        max={yourBoardSize}
                        disabled={isLocked} // Disable input if the board is locked
                      />
                    </td>
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
