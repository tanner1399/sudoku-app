import React from "react";
import "./Board.css";

interface YourSudokuViewProps {
    emptyBoard: number[][];
    yourBoard: number[][];
    boardSize: number;
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
                          emptyBoard[rowIndex][colIndex] ===
                          yourBoard[rowIndex][colIndex]
                            ? true
                            : false
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
                </tbody>
            </table>
        </div>
    );
};

export default YourSudokuView;