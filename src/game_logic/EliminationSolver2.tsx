/* 
TODOS:
Upgrade the EliminationSolver by: 
- Change -1 to emptyCell
*/

import { getBoardSize } from "../MVC/model/sudoku_generator";

// Temp values:
type boardType = number[][];

// Given an array of numbers (the numbers in a col, row or box) find what numbers are missing from that element.
// If there is only one missing number -> return that missing number
function findMissingNum(foundNums: Number[], allNumbers: Number[]) {
  // Match allNumbers[] and foundNums[]
  let missing = allNumbers.filter((item) => foundNums.indexOf(item) < 0);
  if ((missing.length = 1)) {
    return missing[0];
  }
}

export function eliminateSudoku(board: boardType): boardType | null {
  const boardSize = getBoardSize();
  const boxSize = Math.sqrt(boardSize);
  const emptyCell = -1;

  // Make a copy of the board (Found online. Reformat later when input is proberly formatted.)
  const solvedBoard = JSON.parse(JSON.stringify(board));

  // variables used for filling in single missing cells
  let arrMissing = new Array(boardSize);
  let numOfMissing = 0;
  let missingIndex = -1; // Place of the missing number
  const allNumbers = Array.from({ length: boardSize }, (_, i) => i + 1);

  // Check col for single missing
  for (let i = 0; i < boardSize; i++) {
    missingIndex = -1;
    numOfMissing = 0;

    for (let j = 0; j < boardSize; j++) {
      arrMissing[j] = solvedBoard[i][j];

      if (solvedBoard[i][j] == -1) {
        missingIndex = j;
        numOfMissing++;

        if (numOfMissing >= 2) {
          break;
        }
      }
    }
    if (numOfMissing == 1 && missingIndex != -1) {
      let colMissingNumber = findMissingNum(arrMissing, allNumbers);
      solvedBoard[i][missingIndex] = colMissingNumber;
    }
  }

  // Check row for single missing
  for (let i = 0; i < boardSize; i++) {
    missingIndex = -1;
    numOfMissing = 0;

    for (let j = 0; j < boardSize; j++) {
      arrMissing[j] = solvedBoard[j][i];

      if (solvedBoard[j][i] == -1) {
        missingIndex = j;
        numOfMissing++;

        if (numOfMissing >= 2) {
          break;
        }
      }
    }
    if (numOfMissing == 1 && missingIndex != -1) {
      let rowMissingNumber = findMissingNum(arrMissing, allNumbers);
      solvedBoard[missingIndex][i] = rowMissingNumber;
    }
  }

  const isValidPlacement = (row: number, col: number, num: number) => {
    // Given the coordinates, check rows and coloumns if a given number is valid to be placed.
    for (let i = 0; i < boardSize; i++) {
      if (solvedBoard[row][i] == num || solvedBoard[i][col] == num) {
        return false;
      }
    }

    // Checks the same in the 3*3 box
    // TODO: Reformat to fit different sizes
    const startRow = Math.floor(row / boxSize) * boxSize;
    const startCol = Math.floor(col / boxSize) * boxSize;
    for (let i = 0; i < boxSize; i++) {
      for (let j = 0; j < boxSize; j++) {
        if (solvedBoard[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
    // Returns true when the given number (num) is allowed to be placed in the coordinates [row][col]
    return true;
  };

  // TODO: Make this less nested ~_~
  const solve = () => {
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (solvedBoard[row][col] === emptyCell) {
          for (let num = 1; num <= boardSize; num++) {
            if (isValidPlacement(row, col, num)) {
              solvedBoard[row][col] = num;

              // Checks if this number leads to a solution
              if (solve()) {
                return true;
              } else {
                solvedBoard[row][col] = emptyCell; // If no solution is found, set the cell as empty and try again with num++
              }
            }
          }
          // No num can be placed in the cell, therefore:
          return false;
        }
      }
    }
    // If all cells are filled:
    return true;
  };

  // Returns the solved board if it can be solved. Otherwise return null
  // TODO if null is returned to the other files make it handle it with an error or something.
  if (solve()) {
    return solvedBoard;
  } else {
    return null;
  }
}
