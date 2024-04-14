/* 
TODOS:
    - isValidPlacement: Reformat some of the code to fit different size boards
    - Input format -> Get the size of the board, the 2D array generated
    - Actual solver that checks isValidPlacement for all cells and returns the solved 2D array
 */

// Temp values:
type givenBoard = number[][];
const boardSize = 9;
const emptyCell = -1;

function solveSudoku(board: givenBoard): givenBoard | null {
    // Make a copy of the board (Found online. Reformat later when input is proberly formatted.)
    const solvedBoard = JSON.parse(JSON.stringify(board));

    const isValidPlacement = (row: number, col: number, num : number) => {
        // Given the coordinates, check rows and coloumns if a given number is valid to be placed.
        for (let i = 0; i < boardSize; i++) {
            if (solvedBoard[row][i] == num || solvedBoard[i][col] == num) {
                return false;  
            }
        }

        // Checks the same in the 3*3 box
            // TODO: Reformat to fit different sizes
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col/3) * 3; 
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (solvedBoard[startRow + i][startCol + j] === num){
                    return false;
                }
            }
        }
        // Returns true when the given number (num) is allowed to be placed in the coordinates [row][col]
        return true;
    }

    // TODO: Make this less nested ~_~
    const solve = () => {
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                for (let num = 1; num <= boardSize; num++) {
                    if (isValidPlacement(row, col, num)) {
                        solvedBoard[row][col] = num;

                        // Checks if this number leads to a solution
                        if (solve()) {
                            return board
                        } else {
                            solvedBoard[row][col] = emptyCell; // If no solution is found, set the cell as empty and move on
                        }
                    }

                }
            }
        }
        return false // TODO - make the actual solver
    }

    // Returns the solved board if it can be solved. Otherwise return null
    // TODO if null is returned to the other files make it handle it with an error or something. 
    if (solve()){
        return solvedBoard;
    } else {
        return null; 
    }
}