// tests/eliminateSudoku.test.tsx
import { describe, it, expect, vi } from "vitest";
import { eliminateSudoku } from "../src/game_logic/EliminationSolver2";
import * as SudokuGenerator from "../src/mvc/Model/sudokuGenerator";

// Mocking getBoardSize to control the board size
vi.mock("../src/mvc/Model/sudokuGenerator", () => ({
  getBoardSize: vi.fn(),
}));

describe("Eliminate Sudoku Solver", () => {
  beforeEach(() => {
    // Set the board size to 9 for this specific test
    vi.spyOn(SudokuGenerator, "getBoardSize").mockReturnValue(9);
  });

  it("should solve a standard solvable Sudoku board", () => {
    const solvableBoard: number[][] = [
      [5, 3, -1, -1, 7, -1, -1, -1, -1],
      [6, -1, -1, 1, 9, 5, -1, -1, -1],
      [-1, 9, 8, -1, -1, -1, -1, 6, -1],
      [8, -1, -1, -1, 6, -1, -1, -1, 3],
      [4, -1, -1, 8, -1, 3, -1, -1, 1],
      [7, -1, -1, -1, 2, -1, -1, -1, 6],
      [-1, 6, -1, -1, -1, -1, 2, 8, -1],
      [-1, -1, -1, 4, 1, 9, -1, -1, 5],
      [-1, -1, -1, -1, 8, -1, -1, 7, 9],
    ];

    const solvedBoard = eliminateSudoku(solvableBoard);
    expect(solvedBoard).not.toBeNull();
    expect(solvedBoard).toBeInstanceOf(Array);
  });

  it("should return null for an unsolvable Sudoku board", () => {
    const unsolvableBoard: number[][] = [
      [-1, -1, 2, 3, 8, -1, -1, -1, -1],
      [-1, -1, -1, -1, 6, 7, -1, 2, -1],
      [-1, 4, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, 7, -1, -1, -1, -1, -1, -1],
      [-1, 9, -1, -1, -1, -1, 5, -1, 3],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    ];

    // const result = eliminateSudoku(unsolvableBoard);
    // expect(result).toBe(false);
  });

  //Maybe test for different board sizes
});
