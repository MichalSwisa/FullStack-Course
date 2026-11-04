const file = require("fs");
const path = require("path");
const os = require("os");

// ------------ q1 ------------
function appendToFile(filePath, content) {
  let timestamp = new Date().toISOString();
  content = `${timestamp} - Log entry : ${content}`;

  file.appendFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Content appended to ${filePath}`);
    }
  });
}
//appendToFile("./log.txt", "This is a log entry.\n");

// ------------ q2 ------------
function createANewFolder(folderPath) {
  let folderName = "backup";
  let joinedPath = path.join(folderPath, folderName);
  file.access(joinedPath, (err) => {
    if (err) {
      file.mkdir(joinedPath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Folder created successfully.`);
        }
      });
    } else {
      console.log(`Folder already exists.`);
    }
  });
}
//createANewFolder("./");

// ------------ q3 ------------
function deleteAFileSafely(filePath) {
  file.access(filePath, (err) => {
    if (err) {
      console.log("File not found.");
    } else {
      file.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`File deleted.`);
        }
      });
    }
  });
}
//deleteAFileSafely("./temp.txt");

// ------------ q4 ------------
function CPUModelInfo(callback) {
  let cpus = os.cpus();
  callback(null, cpus);
}
// CPUModelInfo((err, cpus) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   cpus.forEach((cpu, index) => {
//     console.log(`CPU ${index}: ${cpu.model}`);
//   });
// });

// ------------ q5 ------------
function delayMessageChain() {
  setTimeout(() => {
    console.log("First message after 1 second");
    setTimeout(() => {
      console.log("Second message after 2 seconds");
      setTimeout(() => {
        console.log("Third message after 3 seconds");
      }, 1000);
    }, 1000);
  }, 1000);
}
//delayMessageChain();

// ------------ q6 ------------
function sumFileSizesInFolder(folderPath) {
  file.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    let completed = 0;
    let numFiles = 0;
    let totalSize = 0;
    files.forEach((innerFile) => {
      file.lstat(path.join(folderPath, innerFile), (err, stats) => {
        if (err) {
          console.error(err);
        } else {
          if (stats.isFile()) {
            numFiles++;
            totalSize += stats.size;
          }
        }
        completed++;
        if (completed === files.length) {
          console.log(`Total number of files in ${folderPath}: ${numFiles}`);
          console.log(
            `Total size of files in ${folderPath}: ${totalSize} bytes`,
          );
        }
      });
    });
  });
}
//sumFileSizesInFolder("./");

// ------------ q7 ------------
function checkFileExtension() {
  const filePath = "./ex-1-async-nodejs-callback.js";
  //const filePath = "./log.txt";
  const ext = path.extname(filePath);
  file.access(filePath, (err) => {
    if (err) {
      console.log("File not found.");
    } else {
      if (ext === ".txt") {
        console.log(`${path.basename(filePath)} is a text file.`);
      } else {
        console.log(`${path.basename(filePath)} is a ${ext} file.`);
      }
    }
  });
}
//checkFileExtension();

// ------------ q8 ------------
function showSystemUptime(callback) {
  const uptime = os.uptime();
  callback(null, uptime);
}
// showSystemUptime((err, uptime) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(`Uptime: ${uptime} seconds`);
//   }
// });

// ------------ q9 ------------
function countdownWithRandomDelay(num) {
  const delay = 500 + Math.random() * 1000;
  setTimeout(() => {
    console.log(num);
    if (num > 0) {
      countdownWithRandomDelay(num - 1);
      return;
    } else {
      console.log("Done!");
    }
  }, delay);
}
//countdownWithRandomDelay(3);

// ------------ q10 ------------
function createAndWriteFile() {
  file.access("./data.txt", file.constants.F_OK, (err) => {
    if (err) {
      file.writeFile("./data.txt", "Hello, World!", (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("File created successfully.");
        }
      });
    } else {
      console.log("File already exists.");
    }
  });
}
//createAndWriteFile();
