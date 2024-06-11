import React from "react";
import "./Board.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Timer from "./timer";

interface SudokuViewProps {
  createdBoard: number[][];
  originalBoard: number[][];
  lifeCounter: number;
  elapsedTime: number;
  isPaused: boolean;
  isFinished: Boolean;
  showPopup: Boolean;
  boardSize: number;
  handleCellChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void;
  handleCellBlur: (
    event: React.FocusEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void;
  handlePauseClick: () => void;
  handleUnpauseClick: () => void;
  solveSudoku: () => void;
  createBoards: () => void;
  giveHint: () => void;
  resetGame: () => void;
  navigateHome: () => void;
  handleClosePopup: () => void;
}

const SudokuBoardView: React.FC<SudokuViewProps> = ({
  createdBoard,
  originalBoard,
  lifeCounter,
  elapsedTime,
  isPaused,
  isFinished,
  showPopup,
  boardSize,
  handleCellChange,
  handleCellBlur,
  handlePauseClick,
  handleUnpauseClick,
  solveSudoku,
  createBoards,
  giveHint,
  resetGame,
  navigateHome,
  handleClosePopup,
}) => {
  return (
    <div className="center-board">
      <div className="Board-header">
        {!isFinished && (
          <div className="timer">
            <Timer elapsedTime={elapsedTime} />
          </div>
        )}
        {!isPaused && !isFinished && (
          <button onClick={handlePauseClick} className="pause-button">
            Pause
          </button>
        )}
        {isPaused && (
          <button onClick={handleUnpauseClick} className="pause-button">
            Unpause
          </button>
        )}
        {isPaused && (
          <div className="blur-container">
            <p className="pause-text">Game is paused!</p>
          </div>
        )}
        {!isFinished && createdBoard && !isPaused && (
          <table>
            <tbody className="board-container">
              {createdBoard.map((row, rowIndex) => (
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
                        onBlur={(e) => handleCellBlur(e, rowIndex, colIndex)}
                        value={col === -1 ? "" : col}
                        className={`cellInput ${
                          createdBoard[rowIndex][colIndex] ===
                          originalBoard[rowIndex][colIndex]
                            ? "correct"
                            : "incorrect"
                        }`}
                        disabled={
                          createdBoard[rowIndex][colIndex] ===
                          originalBoard[rowIndex][colIndex]
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
        )}
        {!isFinished && createdBoard && !isPaused && (
          <div className="buttonContainer">
            <div className="mistakeCounter">
              Your remaining lives: {lifeCounter}
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <button onClick={solveSudoku} className="solveButton">
              Solve
            </button>
            <button onClick={createBoards} className="newGame">
              New Game
            </button>
            <button onClick={giveHint} className="hint">
              Hint
            </button>
            <button onClick={navigateHome} className="menu">
              Menu
            </button>
          </div>
        )}
        {isFinished && (
          <div className="finishedBox">
            Well done! You completed the Sudoku puzzle!
            <div>
              <button onClick={createBoards} className="newGame">
                New Game
              </button>
              <button onClick={resetGame} className="resetGame">
                Reset Game
              </button>
              <button onClick={navigateHome} className="menu">
                Menu
              </button>
            </div>
          </div>
        )}
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>No solution exists for the Sudoku puzzle.</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SudokuBoardView;
