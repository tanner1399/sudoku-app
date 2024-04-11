import * as fs from 'fs';
import * as path from 'path';

// Function to append text to a file
function appendToFile(text: string, filePath: string) {
    fs.appendFileSync(filePath, text + '\n', 'utf8'); // 'utf8' encoding is optional here
}

// Use this function whenever you want to log to both the console and the text file
function logAndSave(text: string, filePath: string) {
    console.log(text); // Log to console as normal
    appendToFile(text, filePath); // Also append to the file
}

// Example usage:
const difficulty = "Easy";
const boardSize = 4;
const time = 0.20000004768371582;

// Prepare the text you want to log and save
const textToLog = `${difficulty}\t${boardSize}\t${time}`;

// Specify the path to your file
const dataFilePath = path.join(__dirname, 'sudokuGenerationData.txt');

// Call your new logging function
logAndSave(textToLog, dataFilePath);
