import React from "react";
import "./Board.css";

interface YourSudokuViewProps {
    emptyBoard: number[][];
    yourBoard: number[][];
    boardSize: number;
    locked: boolean;
    handleCellChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        row: number,
        col: number
      ) => void;
}

const YourSudokuView: React.FC<YourSudokuViewProps> = ({
    emptyBoard, 
    yourBoard, 
    boardSize,
    locked,
    handleCellChange,
}) => {
    return (
        <div className="your-Sudoku">
            <table>
                <tbody className="board-container">
                {emptyBoard.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    (rowIndex + 1) % Math.sqrt(boardSize) === 0 ? "bBorder" : ""
                  }
                >
                  {row.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={
                        (colIndex + 1) % Math.sqrt(boardSize) === 0
                          ? "rBorder"
                          : ""
                      }
                    >
                      <input
                        onChange={(e) =>
                          handleCellChange(e, rowIndex, colIndex)
                        }
                        disabled={
                          locked === true
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
                </tbody>
            </table>
            <button onClick={locked = true} className="lock-sudoku">
            Lock sudoku
          </button>
        </div>
    );
};

export default YourSudokuView;