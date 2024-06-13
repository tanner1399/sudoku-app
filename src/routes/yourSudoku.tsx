import { useNavigate } from "react-router-dom";
import SudokuView from "../MVC/View/YourSudokuView";

// TODO: Remove from HERE
type boardType = number[][];
const testBoard: boardType = [
  [4, 2, 7, -1, -1, -1, -1, 5, 8],
  [1, 8, -1, 5, 7, -1, 4, -1, 6],
  [3, 6, 5, 1, -1, 4, 9, 7, 2],
  [-1, -1, 4, 2, -1, -1, 6, 8, 5],
  [7, -1, 6, 8, -1, 5, 2, -1, 9],
  [2, 5, -1, 9, 6, 1, -1, -1, -1],
  [-1, 9, 2, -1, 1, -1, -1, -1, 4],
  [6, -1, -1, 4, -1, 9, -1, 2, 3],
  [8, 4, 3, 7, 2, -1, 5, 6, 1],
];
const emptyBoard = [...Array(9)].map(e => Array(9));
// to HERE


// TODO: Move this to a YourSudokuController
const handleCellChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  row: number,
  col: number
) => {
  const inputValue = parseInt(event.target.value, 10) || -1;
  const newBoard = [...emptyBoard];
  newBoard[row][col] = inputValue;
};


function YourSudoku() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/");
  };
  return (
    <div>
      <header> Build your own Sudoku</header>
        <SudokuView
        emptyBoard={testBoard}
        yourBoard={testBoard}
        boardSize={9}
        handleCellChange={handleCellChange}
      />
      <button onClick={navigateHome}>Menu</button>
    </div>
  );
}

export default YourSudoku;
