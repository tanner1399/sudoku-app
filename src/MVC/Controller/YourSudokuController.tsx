import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoardView from "../View/YourSudokuView";
import { useSudokuModel } from "../Model/SudokuModel";
import { useYourSudokuModel } from "../Model/YourSudokuModel";

const yourBoardController: React.FC = () => {
    const {
        emptyBoard, 
        yourBoard,
        locked,
    } = useYourSudokuModel

    const setLocked = () => {
        locked = true;
    }

    return (
        false
    )
}
