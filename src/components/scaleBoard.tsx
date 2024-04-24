import { useNavigate } from "react-router-dom";
import "./Board.css";
import {
  generateSudokuBoard,
  getBoardSize,
  generateFullSudokuBoard,
} from "./sudokuGenerator";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Timer from "./timer";
import { eliminateSudoku } from "../game_logic/EliminationSolver";

function ScaleBoard() {
  const navigate = useNavigate();
  const [createdBoard, setCreatedBoard] = useState<number[][]>([]);
  const [originalBoard, setOriginalBoard] = useState<number[][]>([]);
  const [resetBoard, setResetBoard] = useState<number[][]>([]);
  const boardSize = getBoardSize();
  const [lifeCounter, setLifeCounter] = useState<number>(3);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState<Boolean>(false);

  const [showPopup, setShowPopup] = useState<boolean>(false);
    const handleClosePopup = () => { 
      setShowPopup(false)
    }

  const createBoards = () => {
    setElapsedTime(0);
    setIsFinished(false);
    setLifeCounter(3);
    const fullBoard = generateFullSudokuBoard();
    setOriginalBoard(fullBoard);
    const editedBoard = generateSudokuBoard(fullBoard);
    setCreatedBoard(editedBoard);
    let copyOfEditedBoard = editedBoard.map((row) => [...row]);
    setResetBoard(copyOfEditedBoard);
  };

// Solve sudoku w. EliminationSolver.tsx. Shows popup if no solution is found.
  // TODO : The popup needs to be tested with a sudoku that can't be solved. But how? 
  const solveSudoku = () => {
    const solvedElimBoard = eliminateSudoku(createdBoard)
    if (solvedElimBoard !== null) {
      setCreatedBoard(solvedElimBoard);
    } else {
      setShowPopup(true)
    }

     {showPopup && (
      <div className="popup">
        <div className="popup-content">
          <p>No solution exists for the Sudoku puzzle.</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      </div>
    )}
  };

  useEffect(() => {
    const boardSize = parseInt(localStorage.getItem("boardSize")!, 10);
    if (!isNaN(boardSize) && boardSize > 0 && Math.sqrt(boardSize) % 1 === 0) {
      createBoards();
    } else {
      alert("Invalid boardSize, go back to homescreen!");
    }
  }, []);

  useEffect(() => {
    let intervalId: number | null = null;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId); // Cleanup function
    };
  }, [isPaused]);

  const handleCellChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const inputValue = parseInt(event.target.value, 10) || -1;
    const newBoard = [...createdBoard];
    newBoard[row][col] = inputValue;
    setCreatedBoard(newBoard);

    const inputs = event.target;
    const isBoardFinished = newBoard.every((row, rowIndex) =>
      row.every((col, colIndex) => col === originalBoard[rowIndex][colIndex])
    );

    if (isBoardFinished) {
      setIsFinished(true);
    } else if (inputValue === originalBoard[row][col] || inputValue === -1) {
      inputs.classList.remove("incorrect");
      inputs.classList.add("correct");
    } else {
      inputs.classList.remove("correct");
      inputs.classList.add("incorrect");
      setLifeCounter((prevLifeCounter) => prevLifeCounter - 1);
      checkLifeCounter();
    }
  };

  function handlePauseClick() {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  }

  function handleUnpauseClick() {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  }

  const checkLifeCounter = () => {
    if (lifeCounter === 1) {
      alert("Game over! You have run out of lives.");
      navigate("/");
    }
  };

  const navigateHome = () => {
    navigate("/");
  };

  const resetGame = () => {
    setElapsedTime(0);
    setIsFinished(false);
    setLifeCounter(3);
    setCreatedBoard(resetBoard);
  };

  return (
    <div className="center-board">
      <div className="Board-header">
        <div className="timer">
          <Timer elapsedTime={elapsedTime} />
        </div>
        {!isPaused && (
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
        {!isFinished && createdBoard && (
          <table>
            {/* Mapping over rows and columns to generate Sudoku grid */}
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
        </div>
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
              <button className="viewLeaderboard">View Leaderboard</button>
              <button onClick={navigateHome} className="menu">
                Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScaleBoard;
