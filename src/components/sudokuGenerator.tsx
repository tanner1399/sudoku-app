
// Function to shuffle the array
function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Check if a number can be placed at the given row and column
function isValid(board: number[][], row: number, col: number, num: number): boolean {
  // Row check
  for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
  }

  // Column check
  for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
  }

  // 3x3 subgrid check
  const startRow = row - row % 3, startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          if (board[i + startRow][j + startCol] === num) return false;
      }
  }

  return true;
}

// Function to fill the Sudoku board with numbers
function fillBoard(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if (board[row][col] === -1) {
              const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
              for (let num of numbers) {
                  if (isValid(board, row, col, num)) {
                      board[row][col] = num;
                      if (fillBoard(board)) {
                          return true; // The board is successfully filled
                      } else {
                          board[row][col] = -1; // Backtrack
                      }
                  }
              }
              return false; // Trigger backtracking
          }
      }
  }
  return true; // Successfully filled the board
}

// Function to epty a given numbers of cell
function removeNumbers(board: number[][], holes: number): number[][] {
  let attempts = holes;

  while (attempts > 0) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);

      if (board[row][col] !== -1) { 
          board[row][col] = -1;
          attempts--;
      }
  }

  return board;
}

// Exported function to generate a new Sudoku board and make it playable by removing numbers
export function generateSudokuBoard(holes: number = 20): number[][] {
  let board = Array.from({ length: 9 }, () => Array(9).fill(-1));
  fillBoard(board);
  removeNumbers(board, holes); // Remove numbers to create a puzzle
  return board;
}
