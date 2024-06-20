import React from "react";

interface MenuViewProps {
  boardSize: string;
  setBoardSize: React.Dispatch<React.SetStateAction<string>>;
  difficulty: string;
  handleEasyClick: () => void;
  handleMedClick: () => void;
  handleHardClick: () => void;
  handleClick: () => void;
  toBuildYourOwnPage: () => void;
}

const MenuView: React.FC<MenuViewProps> = ({
  boardSize,
  setBoardSize,
  difficulty,
  handleEasyClick,
  handleMedClick,
  handleHardClick,
  handleClick,
  toBuildYourOwnPage,
}) => (
  <div className="menu-container">
    <header className="Title">Sudoku</header>
    <div className="greeting">
      <p>Please select a board size & difficulty</p>
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
