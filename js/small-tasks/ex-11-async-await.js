import fs from "fs";
import path from "path";
import os from "os";

// ------------ q1 ------------
function FileReaderWithStats(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`\nFile Content: \n${data}`);
      fs.stat(path, (err, stats) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`\nSize: ${stats.size} bytes`);
          console.log(`Created At: ${stats.birthtime.toISOString()}`);
        }
      });
    }
  });
}
FileReaderWithStats("./file.txt");

// ------------ q2 ------------
function directoryFilesOnly(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.filter((file) => {
        fs.lstatSync(path.join(dirPath, file), (err, stats) => {
          if (err) {
            return console.error(err);
          } else {
            return stats.isFile();
          }
        });
      });
      files.forEach((file) => {
        console.log(`File: ${file}`);
      });
    }
  });
}
directoryFilesOnly("./");

// ------------ q3 ------------
function countdownTimer(num) {
  setTimeout(() => {
    console.log(num);
    if (num > 0) {
      countdownTimer(num - 1);
    } else {
      console.log("Time's up!");
    }
  }, 1000);
}
countdownTimer(5);

// ----------- q4 ------------
function randomLineFromFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      data = data.split("\n").filter((line) => {
        return line.trim().length > 0;
      });
      let randomNum = Math.floor(Math.random() * data.length);
      console.log(`Random line:${data[randomNum]}`);
    }
  });
}
let filePath = "./quotes.txt";
randomLineFromFile(filePath);

// ----------- q5 ------------
function systemFreeMemoryLogger(repeat) {
  let count = 0;
  const interval = setInterval(() => {
    const freePercentage = (os.freemem() / os.totalmem()) * 100;
    console.log(`Free Memory: ${freePercentage.toFixed(2)}%`);
    count++;
    if (count === repeat) {
      clearInterval(interval);
      console.log("Memory logging complete.");
    }
  }, 2000);
}
const repeat = 5;
systemFreeMemoryLogger(repeat);
