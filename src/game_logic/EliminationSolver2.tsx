/* 
TODOS:
Upgrade the EliminationSolver by: 
- First find cells with (8) cells filled in a row, col or box and put in the missing number
*/

import { getBoardSize } from "../components/sudokuGenerator";

// Temp values:
type boardType = number[][];

// Given an array of numbers (the numbers in a col, row or box) find what numbers are missing from that element.
// If there is only one missing number -> return that missing number
function findMissingNum(foundNums: Number[]){ 
    const boardSize = getBoardSize();
    // TODO: Can the initialisation of allNumbers be moved to only run once?
    const allNumbers = new Array(boardSize)
    for (let i = 1; i <= boardSize; i++){
        allNumbers[i] = i
    }

    // Match allNumbers[] and foundNums[]
    let missing = allNumbers.filter(item => foundNums.indexOf(item) < 0);
    if (missing.length = 1) {
        return missing[0]
    }
}

// Merge the two functions elimSudoku and findMissing

export function eliminateSudoku(board: boardType): boardType | null {
    const boardSize = getBoardSize();
    const boxSize = Math.sqrt(boardSize);
    const emptyCell = -1;

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
        const startRow = Math.floor(row / boxSize) * boxSize;
        const startCol = Math.floor(col/boxSize) * boxSize; 
        for (let i = 0; i < boxSize; i++) {
            for (let j = 0; j < boxSize; j++) {
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
                if (solvedBoard[row][col] === emptyCell) {
                    for (let num = 1; num <= boardSize; num++) {
                        if (isValidPlacement(row, col, num)) {
                            solvedBoard[row][col] = num;
    
                            // Checks if this number leads to a solution
                            if (solve()) {
                                return true
                            } else {
                                solvedBoard[row][col] = emptyCell; // If no solution is found, set the cell as empty and try again with num++
                            }
                        }
                    }
                    // No num can be placed in the cell, therefore:
                    return false
                }
            }
        }
        // If all cells are filled: 
        return true
    }

    // Returns the solved board if it can be solved. Otherwise return null
    // TODO if null is returned to the other files make it handle it with an error or something. 
    if (solve()){
        return solvedBoard;
    } else {
        return null; 
    }
}