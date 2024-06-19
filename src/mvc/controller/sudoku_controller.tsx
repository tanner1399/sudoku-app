import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SudokuBoardView from "../view/sudoku_view";
import { useSudokuModel } from "../model/sudoku_model";

const BoardController: React.FC = () => {
  const {
    createdBoard,
    originalBoard,
    resetBoard,
    lifeCounter,
    elapsedTime,
    isPaused,
    isFinished,
    resetOnce,
    showPopup,
    givenHint,
    boardSize,
    setCreatedBoard,
    setLifeCounter,
    setElapsedTime,
    setIsPaused,
    setIsFinished,
    setResetOnce,
    setShowPopup,
    setGivenHint,
    createBoards,
    solveSudoku,
  } = useSudokuModel();

  const navigate = useNavigate();

  // Function to handle the user input in the cell
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

  // Function to handle and check the user input after the cell has ben exited
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

  // Function to insert a random number in the Sudoku grid
  const giveHint = () => {
    if (givenHint === true) {
      alert("You have already used your hint!");
    } else if (
      confirm("You only have 1 hint per game. Are you sure you want to use it?")
    ) {
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
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // useEffect hook to create a correct board size
  useEffect(() => {
    const boardSize = parseInt(localStorage.getItem("boardSize")!, 10);
    if (!isNaN(boardSize) && boardSize > 0 && Math.sqrt(boardSize) % 1 === 0) {
      createBoards();
    } else {
      alert("Invalid boardSize, go back to homescreen!");
    }
  }, []);

  // Function for timer to count up.
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

  return (
    <SudokuBoardView
      createdBoard={createdBoard}
      originalBoard={originalBoard}
      lifeCounter={lifeCounter}
      elapsedTime={elapsedTime}
      isPaused={isPaused}
      isFinished={isFinished}
      showPopup={showPopup}
      boardSize={boardSize}
      handleCellChange={handleCellChange}
      handleCellBlur={handleCellBlur}
      handlePauseClick={handlePauseClick}
      handleUnpauseClick={handleUnpauseClick}
      solveSudoku={solveSudoku}
      createBoards={createBoards}
      giveHint={giveHint}
      resetGame={resetGame}
      navigateHome={navigateHome}
      handleClosePopup={handleClosePopup}
    />
  );
};

export default BoardController;
