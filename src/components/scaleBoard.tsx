import { Form, useNavigate } from "react-router-dom";
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

function ScaleBoard() {
  const navigate = useNavigate();
  const [createdBoard, setCreatedBoard] = useState<number[][]>([]);
  const [originalBoard, setOriginalBoard] = useState<number[][]>([]);
  const boardSize = getBoardSize();
  const [lifeCounter, setLifeCounter] = useState<number>(3);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  const createBoards = () => {
    const fullBoard = generateFullSudokuBoard();
    setOriginalBoard(fullBoard);
    const editedBoard = generateSudokuBoard(fullBoard);
    setCreatedBoard(editedBoard);
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

    if (inputValue === originalBoard[row][col] || inputValue === -1) {
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

        {!isPaused && createdBoard && (
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
          <button className="checkButton">Check</button>
          <button className="solveButton">Solve</button>
          <button className="resetButton">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default ScaleBoard;
