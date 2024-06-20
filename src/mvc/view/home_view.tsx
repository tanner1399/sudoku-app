import React from "react";

interface MenuViewProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  isLoggedIn: boolean;
  boardSize: string;
  setBoardSize: React.Dispatch<React.SetStateAction<string>>;
  difficulty: string;
  handleLogin: () => void;
  handleEasyClick: () => void;
  handleMedClick: () => void;
  handleHardClick: () => void;
  handleClick: () => void;
  toBuildYourOwnPage: () => void;
}

const MenuView: React.FC<MenuViewProps> = ({
  username,
  setUsername,
  showModal,
  isLoggedIn,
  boardSize,
  setBoardSize,
  difficulty,
  handleLogin,
  handleEasyClick,
  handleMedClick,
  handleHardClick,
  handleClick,
  toBuildYourOwnPage,
}) => (
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
          <select
            className="sizeSelector"
            value={boardSize}
            onChange={(e) => setBoardSize(e.target.value)}
          >
            <option value="" disabled>
              Select board size
            </option>
            <option value={4}> 4 </option>
            <option value={9}> 9</option>
            <option value={16}> 16</option>
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
          className={`medium-button ${difficulty === "Medium" ? "active" : ""}`}
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

export default MenuView;
