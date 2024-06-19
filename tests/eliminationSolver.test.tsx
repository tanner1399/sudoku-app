// File: eliminateSudoku.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { eliminateSudoku } from "../src/game_logic/EliminationSolver";
import { getBoardSize } from "../src/mvc/Model/sudokuGenerator";

vi.mock("../mvc/Model/sudokuGenerator", () => ({
  getBoardSize: vi.fn(() => 9), // Mocking for a 9x9 board
}));

describe("eliminateSudoku", () => {
  let solvableBoard: number[][];
  let unsolvableBoard: number[][];

  beforeEach(() => {
    // A simple solvable Sudoku board:
    solvableBoard = [
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

    // An unsolvable Sudoku board:
    unsolvableBoard = [
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
  });

  it("should solve a solvable Sudoku board", () => {
    const result = eliminateSudoku(solvableBoard);
    expect(result).not.toBeNull();
    // Maybe check some fixed positions
  });

  //   it('should return null for an unsolvable Sudoku board', () => {
  //     const result = eliminateSudoku(unsolvableBoard);
  //     expect(result).toBeNull();
  //   });
});
