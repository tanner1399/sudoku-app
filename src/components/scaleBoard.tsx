import "./Board.css";
import { generateSudokuBoard } from "./sudokuGenerator";
import React, { useState, useEffect } from "react";

function ScaleBoard() {
  const [createdBoard, setCreatedBoard] = useState<number[][]>([]);

  const createBoard = (size: number) => {
    const newBoard = generateSudokuBoard();
    setCreatedBoard(newBoard);
  };

  useEffect(() => {
    const boardSize = parseInt(localStorage.getItem("boardSize")!, 10);
    if (!isNaN(boardSize) && boardSize > 0) {
      createBoard(boardSize);
    } else {
      alert("Invalid boardSize, go back to homescreen!");
    }
  }, []);

  const handleCellChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const newBoard = [...createdBoard];
    newBoard[row][col] = parseInt(event.target.value, 10) || -1;
    setCreatedBoard(newBoard);
  };

  return (
    <div className="center-board">
      <div className="Board-header">
        Sudoku!
        {createdBoard && (
          <table>
            {/* Mapping over rows and columns to generate Sudoku grid */}
            <tbody className="board-container">
              {createdBoard.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={(rowIndex + 1) % 3 === 0 ? "bBorder" : ""}
                >
                  {row.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={(colIndex + 1) % 3 === 0 ? "rBorder" : ""}
                    >
                      <input
                        onChange={(e) =>
                          handleCellChange(e, rowIndex, colIndex)
                        }
                        value={col === -1 ? "" : col}
                        className="cellInput"
                        disabled={col !== -1}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="buttonContainer">
          <button className="checkButton">Check</button>
          <button className="solveButton">Solve</button>
          <button className="resetButton">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default ScaleBoard;
