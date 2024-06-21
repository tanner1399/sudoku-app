// Given an array of numbers (the numbers in a col, row or box) find what numbers are missing from that element.
// If there is only one missing number -> return that missing number
function findMissingNum(foundNums: Number[], allNumbers: Number[]) {
  // Match allNumbers[] and foundNums[]
  let missing = allNumbers.filter((item) => foundNums.indexOf(item) < 0);
  if ((missing.length = 1)) {
    return missing[0];
  }
}

export function eliminateSudoku(board: number[][]): number[][] | null {

  function getBoardSize(){
    return board.length
  }

  const boardSize = getBoardSize();
  const boxSize = Math.sqrt(boardSize);
  const emptyCell = -1;

  // Create a deep copy of the board
  const solvedBoard = JSON.parse(JSON.stringify(board));

  // variables used for filling in single missing cells
  let arrMissing = new Array(boardSize);
  let numOfMissing = 0;
  let missingIndex = emptyCell; // Place of the missing number
  const allNumbers = Array.from({ length: boardSize }, (_, i) => i + 1);

  // Check col for single missing
  for (let i = 0; i < boardSize; i++) {
    missingIndex = emptyCell;
    numOfMissing = 0;

    for (let j = 0; j < boardSize; j++) {
      arrMissing[j] = solvedBoard[i][j];

      if (solvedBoard[i][j] == emptyCell) {
        missingIndex = j;
        numOfMissing++;

        if (numOfMissing >= 2) {
          break;
        }
      }
    }
    if (numOfMissing == 1 && missingIndex != emptyCell) {
      let colMissingNumber = findMissingNum(arrMissing, allNumbers);
      solvedBoard[i][missingIndex] = colMissingNumber;
    }
  }

  // Check row for single missing
  for (let i = 0; i < boardSize; i++) {
    missingIndex = emptyCell;
    numOfMissing = 0;

    for (let j = 0; j < boardSize; j++) {
      arrMissing[j] = solvedBoard[j][i];

      if (solvedBoard[j][i] == emptyCell) {
        missingIndex = j;
        numOfMissing++;

        if (numOfMissing >= 2) {
          break;
        }
      }
    }
    if (numOfMissing == 1 && missingIndex != emptyCell) {
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

    // Checks the same in the boxes
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

  const solve = () => {
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        if (solvedBoard[row][col] === emptyCell) {
          // Tries numbers from 1 to boardSize and checks if they can be placed
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
  if (solve()) {
    return solvedBoard;
  } else {
    return null;
  }
}
