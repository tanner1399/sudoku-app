# How to run the program

1. **Make sure Node.js is installed on your computer**
   - Type: `Node --version` into your terminal
   - If it is installed it will print "_v20.11.1_" or something similar.
   - If nothing shows you can download it from [here](https://nodejs.org/en/download/prebuilt-installer). Please make sure to download the a long term support version (**LTS**)
     - Or follow this [youtube guide](https://www.youtube.com/watch?v=4FAtFwKVhn0)
   - After installation make sure to kill all open terminals
2. Open the "sudoku-app" folder downloaded from [GitHub **MANGLER**]()
   - Run `npm install`
   - Followed by `npm run dev`
   - Open the **localhost** in your webbrowser
3. **(Optional)** Set up testing environment
   - Install Vitest by running: `npm install vitest --save-dev`
   - Install React testing library:
     `npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event`
   - Run: `npm run test`
     - **MANGLER:** folder to change constants
