import { useState } from "react";
import {
  generateSudokuBoard,
  getBoardSize,
  generateFullSudokuBoard,
} from "./sudokuGenerator";
import { eliminateSudoku } from "../../game_logic/EliminationSolver2";

export const useSudokuModel = () => {
  const [createdBoard, setCreatedBoard] = useState<number[][]>([]);
  const [originalBoard, setOriginalBoard] = useState<number[][]>([]);
  const [resetBoard, setResetBoard] = useState<number[][]>([]);
  const [lifeCounter, setLifeCounter] = useState<number>(3);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState<Boolean>(false);
  const [resetOnce, setResetOnce] = useState<Boolean>(false);
  const [showPopup, setShowPopup] = useState<Boolean>(false);
  const [givenHint, setGivenHint] = useState<Boolean>(false);

  const boardSize = getBoardSize();

  // Const to generate all the relevant boards and setting all the states to default value
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

  // Const to sovle the Sudoku
  const solveSudoku = () => {

    const generationTimes = [];
    const startTime = performance.now(); 

    
    const solvedElimBoard = eliminateSudoku(createdBoard);

    const endtime = performance.now();

    generationTimes.push({
      boardSize: getBoardSize(),
      time: endtime - startTime,
    });
  
    generationTimes.forEach((entry) => {
      console.log(`${entry.boardSize}\t${entry.time}`);
    });
  
    if (solvedElimBoard !== null) {
      setCreatedBoard(solvedElimBoard);
    } else {
      setShowPopup(true);
    }
  };

  return {
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
    setOriginalBoard,
    setResetBoard,
    setLifeCounter,
    setElapsedTime,
    setIsPaused,
    setIsFinished,
    setResetOnce,
    setShowPopup,
    setGivenHint,
    createBoards,
    solveSudoku,
  };
};
