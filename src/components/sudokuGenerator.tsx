// Function to shuffle the array
function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Check if a number can be placed at the given row and column
function isValid(
  board: number[][],
  row: number,
  col: number,
  num: number
): boolean {
  const boardSize = getBoardSize();
  // Row check
  for (let x = 0; x < boardSize; x++) {
    if (board[row][x] === num) return false;
  }

  // Column check
  for (let x = 0; x < boardSize; x++) {
    if (board[x][col] === num) return false;
  }

  // Subgrid check
  const subGridSize = Math.floor(Math.sqrt(boardSize));
  const startRow = Math.floor(row / subGridSize) * subGridSize;
  const startCol = Math.floor(col / subGridSize) * subGridSize;
  for (let i = 0; i < subGridSize; i++) {
    for (let j = 0; j < subGridSize; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
}

// Function to fill the Sudoku board with numbers
function fillBoard(board: number[][]): boolean {
  for (let row = 0; row < getBoardSize(); row++) {
    for (let col = 0; col < getBoardSize(); col++) {
      if (board[row][col] === -1) {
        const numbers = shuffleArray(boardSizeToArray(getBoardSize()));
        console.log(numbers);
        console.log(board);
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
    console.log(attempts);
    let row = Math.floor(Math.random() * getBoardSize());
    let col = Math.floor(Math.random() * getBoardSize());

    if (board[row][col] != -1) {
      console.log("if board ja?");
      board[row][col] = -1;
      attempts--;
    }
  }

  return board;
}

// Converts the boardSize to an array of boardSize length
function boardSizeToArray(size: number): number[] {
  const arr = [];
  for (let i = 1; i <= size; i++) {
    arr.push(i);
  }
  return arr;
}

// Gets the inputted boardSize
export function getBoardSize(): number {
  return parseInt(localStorage.getItem("boardSize")!, 10);
}

// Exported function to generate a new Sudoku board and make it playable by removing numbers
export function generateSudokuBoard(holes: number = 1): number[][] {
  let board = Array.from({ length: getBoardSize() }, () =>
    Array(getBoardSize()).fill(-1)
  );
  fillBoard(board);
  removeNumbers(board, holes); // Remove numbers to create a puzzle
  return board;
}
