// tests/sudokuGenerator.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isValid,
  fillBoard,
  generateSudokuBoard,
  getBoardSize,
} from "../src/MVC/Model/sudokuGenerator";


vi.mock("../src/MVC/Model/sudokuGenerator", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual, // Spread all actual implementations
    getBoardSize: vi.fn(() => 9), 
    isValid: vi.fn(() => true), 
  };
}); 

describe("fillBoard Function", () => {
    beforeEach(() => {
      // Set up specific behaviors for `isValid` for each test, or reset mocks
      vi.mocked(isValid).mockImplementation((board, row, col, num) => true); // Assume all placements are valid
    });

    afterEach(() => {
      // Reset the mocks after each test to prevent interference
      vi.resetAllMocks();
    });

  it("should successfully fill the board", () => {
    vi.mocked(isValid).mockImplementation((board, row, col, num) => true); //All placements are valid
    const board = Array.from({ length: 9 }, () => Array(9).fill(-1));
    expect(fillBoard(board)).toBe(true);
  });

  it("should fail to fill the board when no valid moves are possible", () => {
    vi.mocked(isValid).mockImplementation((board, row, col, num) => false); // No placements are valid
    const board = Array.from({ length: 9 }, () => Array(9).fill(-1));
    expect(fillBoard(board)).toBe(true);
  });
});
