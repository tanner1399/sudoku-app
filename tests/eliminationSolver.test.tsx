// File: eliminateSudoku.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { eliminateSudoku } from '../src/game_logic/EliminationSolver';
import { getBoardSize } from '../src/MVC/Model/sudokuGenerator';

vi.mock('../MVC/Model/sudokuGenerator', () => ({
  getBoardSize: vi.fn(() => 9), // Mocking for a 9x9 board
}));

describe('eliminateSudoku', () => {
  let solvableBoard: number[][];
  let unsolvableBoard: number[][];

  beforeEach(() => {
    // A simple solvable Sudoku board:
    solvableBoard = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    // An unsolvable Sudoku board:
    unsolvableBoard = [
      [5, 1, 6, 8, 4, 9, 7, 3, 2],
      [3, 0, 7, 6, 0, 5, 0, 0, 0],
      [8, 0, 9, 7, 0, 0, 0, 6, 5],
      [1, 3, 5, 0, 6, 0, 9, 0, 7],
      [4, 7, 2, 5, 9, 1, 0, 0, 6],
      [9, 6, 8, 3, 7, 0, 0, 5, 0],
      [2, 5, 3, 1, 8, 6, 0, 7, 4],
      [6, 8, 4, 2, 5, 7, 0, 0, 0],
      [7, 9, 1, 0, 3, 0, 5, 0, 8]
    ];
  });

  it('should solve a solvable Sudoku board', () => {
    const result = eliminateSudoku(solvableBoard);
    expect(result).not.toBeNull();
    // Maybe check some fixed positions
  });

//   it('should return null for an unsolvable Sudoku board', () => {
//     const result = eliminateSudoku(unsolvableBoard);
//     expect(result).toBeNull();
//   });
});
