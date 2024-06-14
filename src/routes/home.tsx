import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Menu() {
  useEffect(() => {
    document.title = "Sudoku";
  }, []);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boardSize, setBoardSize] = useState("");
  const [difficulty, setActiveDifficulty] = useState("");

  // Function to handle the start game click
  function handleClick() {
    const size = parseInt(boardSize, 10);
    if (!isNaN(size) && size > 0 && Math.sqrt(size) % 1 === 0) {
      localStorage.setItem("boardSize", boardSize);
      navigate("/Game");
    } else {
      alert("Please select a valid board size before starting the game");
    }
  }

  // Function to handle and validate user login
  function handleLogin() {
    if (validateUsername(username)) {
      setShowModal(false);
      setIsLoggedIn(true);
    }
  }
  // Functions to handle the choice of difficulty
  function handleEasyClick() {
    localStorage.setItem("difficulty", "Easy");
    setActiveDifficulty("Easy");
  }

  function handleMedClick() {
    localStorage.setItem("difficulty", "Medium");
    setActiveDifficulty("Medium");
  }

  function handleHardClick() {
    localStorage.setItem("difficulty", "Hard");
    setActiveDifficulty("Hard");
  }

  // Handles the input board size
  const handleBoardSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setBoardSize(size);
  };

  function toBuildYourOwnPage() {
    navigate("/buildYourOwn");
  }

  // Function to validate the chosen username
  function validateUsername(username: string) {
    if (username.length > 20) {
      alert("Username cannot be longer than 20 charecters or empty");
      return false;
    } else if (username.length == 0) {
      alert("Username cannot be empty!");
      return false;
    } else if (/\s/.test(username)) {
      alert("Username cannot contain blank spaces");
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="menu-container">
      <header className="Title">Sudoku</header>
      {showModal && (
        <div className="modal">
          <input // Input field for the username
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {isLoggedIn && (
        <div className="greeting">
          <p>
            Hi {username}!<br />
            Please select a board size & difficulty
          </p>
          <form>
            <select // Board size option menu
              className="sizeSelector"
              value={boardSize}
              onChange={handleBoardSize}
            >
              <option value="" disabled>
                Select board size
              </option>
              <option value={4}> 4 </option>
              <option value={9}> 9</option>
              <option value={16}> 16</option>
              <option value={25}> 25</option>
            </select>
          </form>
        </div>
      )}
      <div className="buttons-container">
        <div className="difficulty-buttons">
          <button
            onClick={handleEasyClick}
            className={`easy-button ${difficulty === "Easy" ? "active" : ""}`}
          >
            Easy
          </button>
          <button
            onClick={handleMedClick}
            className={`medium-button ${
              difficulty === "Medium" ? "active" : ""
            }`}
          >
            Medium
          </button>
          <button
            onClick={handleHardClick}
            className={`hard-button ${difficulty === "Hard" ? "active" : ""}`}
          >
            Hard
          </button>
        </div>
        <button className="start-button" type="button" onClick={handleClick}>
          Start Game
        </button>
        <button onClick={toBuildYourOwnPage}>Build your own</button>
      </div>
    </div>
  );
}

export default Menu;
