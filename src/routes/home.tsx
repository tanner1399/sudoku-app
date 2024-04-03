import React, { useState, useEffect } from "react";
import "./home.css";

import { useNavigate } from "react-router-dom";

export default function Root() {
  useEffect(() => {
    document.title = "SouDouKou"; // Set title of page
  }, []);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [EasyClicked, setEasyClicked] = useState(false);
  const [MedClicked, setMedClicked] = useState(false);
  const [hardClicked, setHardClicked] = useState(false);

  function handleClick() {
    navigate("/Game");
  }

  function handleLogin() {
    if (validateUsername(username)) {
      setShowModal(false);
      setIsLoggedIn(true);
    }
  }

  function handleEasyClick() {
    setEasyClicked(true);
    setMedClicked(false);
    setHardClicked(false);
  }

  function handleMedClick() {
    setEasyClicked(false);
    setMedClicked(true);
    setHardClicked(false);
  }

  function handleHardClick() {
    setEasyClicked(false);
    setMedClicked(false);
    setHardClicked(true);
  }

  function validateUsername(username: string) {
    if (username.length > 20) {
      alert("Username cannot be longer than 20 charecters");
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
