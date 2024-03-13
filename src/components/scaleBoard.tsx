import { Component } from "react";
import "./Board.css";

class ScaleBoard extends Component {
  state = {
    boardSize: "",
    inputBoard: [] as number[][],
    createdBoard: [] as number[][],
  };

  createBoard = () => {
    const boardSize = parseInt(this.state.boardSize, 10);
    if (!isNaN(boardSize) && boardSize > 0) {
      const newBoard = Array.from({ length: boardSize }, () =>
        Array(boardSize).fill(-1)
      );
      this.setState({
        inputBoard: newBoard,
        createdBoard: newBoard,
      });
    } else {
      alert("Invalid board size! Try again");
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      boardSize: event.target.value,
    });
  };

  handleCellChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const { createdBoard } = this.state;
    const newBoard = [...createdBoard];
    newBoard[row][col] = parseInt(event.target.value, 10) || -1;

    this.setState({
      createdBoard: newBoard,
    });
  };

  render() {
    const { createdBoard } = this.state;

    return (
      <div className="center-board">
        <div className="Board-header">
          Scale me!
          <form>
            <input
              onChange={this.handleChange}
              type="number"
              value={this.state.boardSize}
            ></input>
          </form>
          <button onClick={this.createBoard}>Create</button>
          {createdBoard && (
            <table>
              {/* Mapping over rows and columns to generate Sudoku grid */}
              <tbody>
                {createdBoard.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={(rowIndex + 1) % 3 === 0 ? "bBorder" : ""}
                  >
                    {row.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={(colIndex + 1) % 3 === 0 ? "rBorder" : ""}
                      >
                        <input
                          onChange={(e) =>
                            this.handleCellChange(e, rowIndex, colIndex)
                          }
                          value={col === -1 ? "" : col}
                          className="cellInput"
                          disabled={col !== -1}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="buttonContainer">
            <button className="checkButton">Check</button>
            <button className="solveButton">Solve</button>
            <button className="resetButton">Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ScaleBoard;
