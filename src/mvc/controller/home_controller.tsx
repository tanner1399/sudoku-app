import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuView from "../view/home_view";
import {
  validateUsername,
  saveBoardSize,
  saveDifficulty,
} from "../model/home_model";
import "../view/home.css";

const MenuController: React.FC = () => {
  useEffect(() => {
    document.title = "Sudoku";
  }, []);

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [boardSize, setBoardSize] = useState<string>("");
  const [difficulty, setActiveDifficulty] = useState<string>("");

  const handleClick = () => {
    const size = parseInt(boardSize, 10);
    if (!isNaN(size) && size > 0 && Math.sqrt(size) % 1 === 0) {
      saveBoardSize(boardSize);
      navigate("/Game");
    } else {
      alert("Please select a valid board size before starting the game");
    }
  };

  const handleLogin = () => {
    if (validateUsername(username)) {
      setShowModal(false);
      setIsLoggedIn(true);
    }
  };

  const handleEasyClick = () => {
    saveDifficulty("Easy");
    setActiveDifficulty("Easy");
  };

  const handleMedClick = () => {
    saveDifficulty("Medium");
    setActiveDifficulty("Medium");
  };

  const handleHardClick = () => {
    saveDifficulty("Hard");
    setActiveDifficulty("Hard");
  };

  const toBuildYourOwnPage = () => {
    navigate("/buildYourOwn");
  };

  return (
    <MenuView
      username={username}
      setUsername={setUsername}
      showModal={showModal}
      isLoggedIn={isLoggedIn}
      boardSize={boardSize}
      setBoardSize={setBoardSize}
      difficulty={difficulty}
      handleLogin={handleLogin}
      handleEasyClick={handleEasyClick}
      handleMedClick={handleMedClick}
      handleHardClick={handleHardClick}
      handleClick={handleClick}
      toBuildYourOwnPage={toBuildYourOwnPage}
    />
  );
};

export default MenuController;
