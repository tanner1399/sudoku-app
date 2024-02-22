import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";

const initialBoard = [
  [-1, 1, -1, 3, -1, -1, 8, -1, -1],
  [5, -1, 9, 6, -1, -1, 7, -1, -1],
  [7, -1, 4, -1, 9, 5, -1, 2, -1],
  [4, -1, -1, -1, -1, -1, 1, -1, -1],
  [-1, 2, 8, -1, 7, 1, -1, 6, 3],
  [-1, -1, -1, 2, -1, 4, 9, 5, -1],
  [6, -1, 3, -1, -1, 9, -1, -1, 7],
  [-1, -1, -1, 4, 2, -1, 5, 1, 6],
  [-1, 5, 2, -1, 8, -1, -1, 4, -1],
];

function App() {

  const [boardArray, setBoardArray] = useState(getDeepCopy(initialBoard));
  
  function getDeepCopy(arr: number[][]) {
    return JSON.parse(JSON.stringify(arr));
  }

  //updating the array after input from user
  function onInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    var val = parseInt(e.target.value) || -1,
      grid = getDeepCopy(boardArray);

    if (val === -1 || (val >= 1 && val <= 9)) {
      grid[row][col] = val;
    }

    setBoardArray(grid);
  }

return (
 
  <div className="Board-header">
    <h2>Sudoku</h2>
      <Board boardArray={boardArray} onInputChange={onInputChange} />
  </div>

);
}


export default App;
