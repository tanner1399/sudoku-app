import { useState } from "react";

export const useYourSudokuModel = () => {
    const [emptyBoard, setEmptyBoard] = useState<number[][]>([]);
    const [yourBoard, setYourBoard] = useState<number[][]>([]);
    const [locked, setLocked] = useState<Boolean>(false);

    const boardSize = getYourBoardSize(); //TODO make this function

    // TEST constants. TODO: REMOVe
/*     const testBoard = [
        [4, 2, 7, -1, -1, -1, -1, 5, 8],
        [1, 8, -1, 5, 7, -1, 4, -1, 6],
        [3, 6, 5, 1, -1, 4, 9, 7, 2],
        [-1, -1, 4, 2, -1, -1, 6, 8, 5],
        [7, -1, 6, 8, -1, 5, 2, -1, 9],
        [2, 5, -1, 9, 6, 1, -1, -1, -1],
        [-1, 9, 2, -1, 1, -1, -1, -1, 4],
        [6, -1, -1, 4, -1, 9, -1, 2, 3],
        [8, 4, 3, 7, 2, -1, 5, 6, 1],
      ];
      let emptyBoard:  = [...Array(9)].map(e => Array(9));
      emptyBoard = Array.prototype.fill(-1); */

    const initializedYourSudoku = () => {
        let emptyBoard = [...Array(9)].map(e => Array(9));
        emptyBoard = Array.prototype.fill(-1);
        setEmptyBoard(emptyBoard);
    }
}