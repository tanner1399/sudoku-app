import React, { useState, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Root() {
  useEffect(() => {
    document.title = "Sudoku"; // Set title of page
  }, []);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boardSize, setBoardSize] = useState("");

  function handleClick() {
    const size = parseInt(boardSize, 10);
    if (!isNaN(size) && size > 0 && Math.sqrt(size) % 1 === 0) {
      localStorage.setItem("boardSize", boardSize);
      navigate("/Game");
    } else {
      alert("Please select a valid board size before starting the game");
    }
  }

  function handleLogin() {
    if (validateUsername(username)) {
      setShowModal(false);
      setIsLoggedIn(true);
    }
  }
  function handleEasyClick() {
    localStorage.setItem("difficulty", "Easy");
  }

  function handleMedClick() {
    localStorage.setItem("difficulty", "Medium");
  }

  function handleHardClick() {
    localStorage.setItem("difficulty", "Hard");
  }

  const handleBoardSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setBoardSize(size);
  };

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
          <input
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
            <select value={boardSize} onChange={handleBoardSize}>
              <option value="" disabled>
                Select board size
              </option>
              <option value={4}> 4 </option>
              <option value={9}> 9</option>
              <option value={16}> 16</option>
              <option value={25}> 25</option>
              <option value={36}> 36</option>
              <option value={49}> 49</option>
              <option value={64}> 64</option>
            </select>
          </form>
        </div>
      )}
      <div className="buttons-container">
        <div className="difficulty-buttons">
          <button onClick={handleEasyClick} className="easy-button">
            Easy
          </button>
          <button onClick={handleMedClick} className="medium-button">
            Medium
          </button>
          <button onClick={handleHardClick} className="hard-button">
            Hard
          </button>
        </div>
        <button className="start-button" type="button" onClick={handleClick}>
          Start Game
        </button>
      </div>
    </div>
  );
}
