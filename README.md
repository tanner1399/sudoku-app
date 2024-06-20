# Run program
- Install Node.js (check with node --version) (https://www.youtube.com/watch?v=4FAtFwKVhn0)
- Kill terminal (+ restart code editing program if opend) -> Be in the "sudoku-app" folder and:  
- npm install
- install test
- npm run dev -> open local host

# Sudoku Generation

Might be worth to look into this: [Minimum numbers given for a sudoku](https://en.wikipedia.org/wiki/Mathematics_of_Sudoku#Minimum_number_of_givens)
They mention some kind of standard generator called "Unbiased Statistics of a CSP – A Controlled-Bias Generator".

### Note

> **Mathematical context**
> The general problem of solving Sudoku puzzles on $n^2\times n^2$ grids of n×n blocks is known to be NP-complete.

_lol..._

# Sudoku Solving Algorithms

## Constraint Propagation (currently implementing)

Also known as the elimination method. Iteratively applying Sudoku constraints to eliminate possible values for each empty cell based on the values in its row, column, and box.

## Backtracking

| Pros                | Cons                                         |
| ------------------- | -------------------------------------------- |
| Easy to implement   | Exhaustive[(?)](#is-backtracking-exhaustive) |
| Is easlily scalable | Not that fast                                |

### Is Backtracking exhaustive?

Hmmm. Yes kind of... #TODO

## Stochastic search

A solving algorithms that randomly fills in the board, then checks for violations and then shuffling them.
|Pros|Cons|
|-|-|
|Still easy to implement|Faster than exhaustive, but slower than deductive algorithms|
|Fun | Random|

#### Note

After a sudoku is given there will always be a specific set a numbers. Meaning there is from the start a finite set of possible numbers that can be used.

## Others

- [Simplex Algortihm](https://en.wikipedia.org/wiki/Simplex_algorithm)
  - Might requires some understanding of simplices (geometry and dimensions)
  - Can indicate if a Sudoku is valid or not

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Set up of test environment:

Step 1 - Install vitest:
npm install vitest --save-dev

Step 2 - Install React testing library:
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event

To run the test, type 'npm run test' in the terminal
