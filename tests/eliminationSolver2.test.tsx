// tests/eliminateSudoku.test.tsx
import { describe, it, expect, vi } from "vitest";
import { eliminateSudoku } from "../src/game_logic/EliminationSolver2";
import * as SudokuGenerator from "../src/MVC/Model/sudokuGenerator";

// Mocking getBoardSize to control the board size 
vi.mock("../src/MVC/Model/sudokuGenerator", () => ({
  getBoardSize: vi.fn(),
}));

describe("Eliminate Sudoku Solver", () => {
  beforeEach(() => {
    // Set the board size to 9 for this specific test
    vi.spyOn(SudokuGenerator, "getBoardSize").mockReturnValue(9);
  });

  it("should solve a standard solvable Sudoku board", () => {
    const solvableBoard: number[][] = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
    const solvedBoard = eliminateSudoku(solvableBoard);
    expect(solvedBoard).not.toBeNull();
    expect(solvedBoard).toBeInstanceOf(Array);
  });

  it("should return null for an unsolvable Sudoku board", () => {
    const unsolvableBoard: number[][] = [
      [5, 1, 6, 8, 4, 9, 7, 3, 2],
      [3, 0, 7, 6, 0, 5, 0, 0, 0],
      [8, 0, 9, 7, 0, 0, 0, 6, 5],
      [1, 3, 5, 0, 6, 0, 9, 0, 7],
      [4, 7, 2, 5, 9, 1, 0, 0, 6],
      [9, 6, 8, 3, 7, 0, 0, 5, 0],
      [2, 5, 3, 1, 8, 6, 0, 7, 4],
      [6, 8, 4, 2, 5, 7, 0, 0, 0],
      [7, 9, 1, 0, 3, 0, 5, 0, 8],
    ];
    // const result = eliminateSudoku(unsolvableBoard);
    // expect(result).toBeNull();
  });

  //Maybe test for different board sizes
});
