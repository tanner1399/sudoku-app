import React, { useState } from "react";
import "./Root.css";

import { useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleClick() {
    navigate("/Game");
  }

  function handleLogin() {
    setShowModal(false);
    setIsLoggedIn(true);
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
          <p>Hi {username}! Please select a difficulity</p>
        </div>
      )}
      <div className="buttons-container">
        <div className="difficulty-buttons">
          <button className="easy-button">Easy</button>
          <button className="medium-button">Medium</button>
          <button className="hard-button">Hard</button>
        </div>
        <button className="start-button" type="button" onClick={handleClick}>
          Start Game
        </button>
      </div>
    </div>
  );
}
