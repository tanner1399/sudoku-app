function compareSudokus(currentSudoku: number[][], solvedSudoku: number[][]) {
  let res = {
    isComplete: true, // Flag to indicate if the board is completely and correctly filled
    isSolvable: true, // Flag to indicate if the board can still be solved based on current state
  };

  // Iterate over each cell to compare the current and solved Sudoku states
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (currentSudoku[i][j] != solvedSudoku[i][j]) {
        if (currentSudoku[i][j] != -1) {
          res.isSolvable = false; // Mark as unsolvable if a cell is filled incorrectly
        }
        res.isComplete = false; // Mark as incomplete if any cell is still empty or incorrect
      }
    }
  }
  return res;
}

// Function to check the Sudoku solution
function checkSudoku() {
  let sudoku = getDeepCopy(initialBoard);
  solver(sudoku);

  let compare = compareSudokus(boardArray, sudoku); // Compare the current board to the solved one

  // Provide feedback based on the comparison
  if (compare.isComplete) {
    alert("Congrats! The sudoku is solved");
  } else if (compare.isSolvable) {
    alert("You're getting closer! Keep going!");
  } else {
    alert("Wrong! Try again");
  }
}

// Further functions (`checkRow`, `checkCol`, `checkSquare`, `checkValid`, `getNext`, `solver`, `solveSudoku`, `resetSudoku`)
// are used to implement Sudoku solving logic and validate moves

// Checks if a given number can be legally placed in a specified row
function checkRow(grid: number[][], row: number, num: number) {
  return grid[row].indexOf(num) === -1; // Returns true if the number is not already in the row
}

// Checks if a given number can be legally placed in a specified column
function checkCol(grid: number[][], col: number, num: number) {
  return grid.map((row) => row[col]).indexOf(num) === -1; // Maps each row to its value in the column and checks if the number is not present
}

function checkSquare(grid: number[][], row: number, col: number, num: number) {
  //get the indexes of the square
  let squareArray = [],
    rowStart = row - (row % 3), // Calculates the starting indexes
    colStart = col - (col % 3);

  //
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //to get all the cell numbers and save it in the squareArray
      squareArray.push(grid[rowStart + i][colStart + j]);
    }
  }
  return squareArray.indexOf(num) === -1; // Returns true if the number is not already in the square
}

//This function validates if a given move is legal by checking the row, column, and square constraints
function checkValid(grid: number[][], row: number, col: number, num: number) {
  if (
    checkRow(grid, row, num) &&
    checkCol(grid, col, num) &&
    checkSquare(grid, row, col, num)
  ) {
    return true;
  }
  return false;
}

function getNext(row: number, col: number) {
  //if col reaches 8, increase row
  //if row reaches 8 and col reaches 8, next index will be [0,0] indicating the end of the grid
  return col !== 8 ? [row, col + 1] : row != 8 ? [row + 1, 0] : [0, 0];
}

//function to solve the sudoki, using backtracking
//TODO: implement waiting time
function solver(grid: number[][], row = 0, col = 0) {
  if (grid[row][col] !== -1) {
    //If current cell already is filled, move to next cell
    let isLast = row >= 8 && col >= 8;
    if (!isLast) {
      // If there are no more cells to fill, the Sudoku is solved
      let [nextRow, nextCol] = getNext(row, col);
      return solver(grid, nextRow, nextCol);
    }
  }
  for (let num = 1; num <= 9; num++) {
    // Try all possible numbers (1-9)
    //check if the number satisfy the contrains
    if (checkValid(grid, row, col, num)) {
      //If the number is valid, fill the number in the cell
      grid[row][col] = num;
      // get Next cell and repeat function
      let [nextRow, nextCol] = getNext(row, col);

      if ((!nextRow && !nextCol) || solver(grid, nextRow, nextCol)) {
        // If Sudoku is solved with this placement, return true
        return true;
      }
    }
  }

  // if it's invalid backtrack by resetting the cell
  grid[row][col] = -1;
  return false; // If no number is valid in the current cell, return false to trigger backtracking
}
//TODO: make this to an if statement
//TODO: / If the solver successfully solves the puzzle,update the board state with the solution, make an alert to notify the user if the Sudoku is unsolvable
function solveSudoku() {
  let sudoku = getDeepCopy(initialBoard);
  solver(sudoku);
  setBoardArray(sudoku);
}

function resetSudoku() {
  let sudoku = getDeepCopy(initialBoard);
  setBoardArray(sudoku);
}
