// Function to validate the username with proper TypeScript types
export const validateUsername = (username: string): boolean => {
  if (username.length > 20) {
    alert("Username cannot be longer than 20 characters or empty");
    return false;
  } else if (username.length === 0) {
    alert("Username cannot be empty!");
    return false;
  } else if (/\s/.test(username)) {
    alert("Username cannot contain blank spaces");
    return false;
  } else {
    return true;
  }
};

// Function to save the board size with proper TypeScript types
export const saveBoardSize = (size: string): void => {
  localStorage.setItem("boardSize", size);
};

// Function to save the difficulty with proper TypeScript types
export const saveDifficulty = (difficulty: string): void => {
  localStorage.setItem("difficulty", difficulty);
};
