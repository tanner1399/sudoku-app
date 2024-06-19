// tests/sudokuGenerator.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isValid,
  fillBoard,
  generateSudokuBoard,
  getBoardSize,
} from "../src/mvc/Model/sudokuGenerator";
//Test isValid function:
describe("isValid Function", () => {
  const board = [
    [4, 2, 7, -1, -1, -1, -1, 5, 8],
    [1, 8, -1, 5, 7, -1, 4, -1, 6],
    [3, 6, 5, 1, -1, 4, 9, 7, 2],
    [-1, -1, 4, 2, -1, -1, 6, 8, 5],
    [7, -1, 6, 8, -1, 5, 2, -1, 9],
    [2, 5, -1, 9, 6, 1, -1, -1, -1],
    [-1, 9, 2, -1, 1, -1, -1, -1, 4],
    [6, -1, -1, 4, -1, 9, -1, 2, 3],
    [8, 4, 3, 7, 2, -1, 5, 6, 1],
  ];

  it("should return false when number conflicts in the row", () => {
    expect(isValid(board, 0, 3, 4)).toBe(false); // Expect false because 4 is already in the first row
  });

  it("should return false when number conflicts in the column", () => {
    expect(isValid(board, 4, 4, 6)).toBe(false); // Expect false because 7 is already in the fifth column
  });

  it("should return false when number conflicts in the subgrid", () => {
    expect(isValid(board, 0, 0, 2)).toBe(false); // Expect false because 6 is already in the center subgrid
  });

  it("should return true when number can be placed without conflict", () => {
    expect(isValid(board, 1, 2, 9)).toBe(true); // Expect true because 9 does not conflict with other numbers in its row, column, or subgrid
  });
});

//Test getBoardSize
describe("getBoardSize Function", () => {
  it("should return the correct board size from localStorage", () => {
    localStorage.setItem("boardSize", "9");
    expect(getBoardSize()).toBe(9);
    localStorage.setItem("boardSize", "16");
    expect(getBoardSize()).toBe(16);
  });
});

//FillBoard
//handleCellChange (coltroller)
//handlecellBlur (controller)
//giveHint
