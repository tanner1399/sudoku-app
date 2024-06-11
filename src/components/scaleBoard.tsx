import { useNavigate } from "react-router-dom";
import "./Board.css";
import {
  generateSudokuBoard,
  getBoardSize,
  generateFullSudokuBoard,
} from "../MVC/Model/sudokuGenerator";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Timer from "../MVC/View/timer";
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
  const [resetOnce, setResetOnce] = useState<Boolean>(false);
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const [givenHint, setGivenHint] = useState<Boolean>(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const createBoards = () => {
    setElapsedTime(0);
    setResetOnce(false);
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
    const solvedElimBoard = eliminateSudoku(createdBoard);
    if (solvedElimBoard !== null) {
      setCreatedBoard(solvedElimBoard);
    } else {
      setShowPopup(true);
    }

    {
      showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>No solution exists for the Sudoku puzzle.</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      );
    }
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
    let intervalId: NodeJS.Timeout | null = null;

    if (!isPaused && !isFinished) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
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
  };

  const handleCellBlur = (
    event: React.FocusEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const inputs = event.target;
    const inputValue = parseInt(inputs.value, 10) || -1;

    const isBoardFinished = createdBoard.every((row, rowIndex) =>
      row.every((col, colIndex) => col === originalBoard[rowIndex][colIndex])
    );

    if (!isBoardFinished) {
      if (inputValue === originalBoard[row][col] || inputValue === -1) {
        inputs.classList.remove("incorrect");
        inputs.classList.add("correct");
      } else {
        inputs.classList.remove("correct");
        inputs.classList.add("incorrect");
        setLifeCounter((prevLifeCounter) => prevLifeCounter - 1);
        checkLifeCounter();
      }
    }
  };

  function handlePauseClick() {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  }

  function handleUnpauseClick() {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  }

  const checkResetOnce = () => {
    if (resetOnce === true) {
      alert("You have already resetted the game");
    }
  };

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
    setResetOnce(true);
    if (resetOnce === false) {
      setElapsedTime(0);
      setIsFinished(false);
      setLifeCounter(3);
      setCreatedBoard(resetBoard);
    } else {
      checkResetOnce();
    }
  };

  const giveHint = () => {
    if (givenHint === false) {
      const emptyCells: { row: number; col: number }[] = [];

      createdBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === -1) {
            emptyCells.push({ row: rowIndex, col: colIndex });
          }
        });
      });

      if (emptyCells.length > 0) {
        const randomCell = Math.floor(Math.random() * emptyCells.length);
        const { row, col } = emptyCells[randomCell];
        const newBoard = [...createdBoard];
        newBoard[row][col] = originalBoard[row][col];
        setCreatedBoard(newBoard);
        setGivenHint(true);
      }
    } else {
      alert("You have already used a hint!");
    }
  };

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
      </div>
    </div>
  );
}

export default ScaleBoard;
