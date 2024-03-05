import React, { useState } from "react";
import "./App.css";
//import Board from "./components/Board";

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
    <div className="center-board">
      <div className="Board-header">
        <h2>Sudoku</h2>
        <table>
          {/* Mapping over rows and columns to generate Sudoku grid */}
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIndex) => {
              return (
                <tr
                  key={rowIndex}
                  className={(row + 1) % 3 === 0 ? "bBorder" : ""}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, colIndex) => {
                    return (
                      <td
                        key={rowIndex + colIndex}
                        className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                      >
                        <input
                          onChange={(e) => onInputChange(e, row, col)}
                          value={
                            boardArray[row][col] === -1
                              ? ""
                              : boardArray[row][col]
                          }
                          className="cellInput"
                          disabled={initialBoard[row][col] !== -1}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
