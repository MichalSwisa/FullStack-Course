// ---------- q1 ----------
// function delayedGreet(name, delay) {
//   return new Promise((res) => {
//     setTimeout(() => {
//       console.log(`(After ${delay / 1000} seconds)`);
//       res(`Hello, ${name}!`);
//     }, delay);
//   });
// }
// delayedGreet("Alice", 2000).then((result) => {
//   console.log(result);
// });

// ---------- q2 ----------
// import fs from "fs";

// function readFileContent(path) {
//   return new Promise((res, rej) => {
//     fs.readFile(path, "utf8", (err, data) => {
//       if (err) {
//         rej(err);
//       } else {
//         res(data);
//       }
//     });
//   });
// }
// let path = "./file.txt";
// readFileContent(path).then((data) => {
//   console.log(`\nContent of ${path}: \n${data}`);
// }).catch((err) => {
//   console.error(err);
// });

// ---------- q3 ----------
// function randomOperation(){
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             const randomNum = Math.random();
//             if (randomNum < 0.5) {
//                 res(`Success!`);
//             } else {
//                 rej(`Error!`);
//             }
//         }, 1000);
//     });
// }

// randomOperation()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// // ---------- q4 ----------
// function raceTimers(){
//     const timerA = new Promise((res) => {
//         setTimeout(() => {
//             res("Timer A finished!");
//         }, 2000);
//     });

//     const timerB = new Promise((res) => {
//         setTimeout(() => {
//             res("Timer B finished");
//         }, 3000);
//     });

//     return Promise.race([timerA, timerB]);
// }
// raceTimers()
//     .then((result) => {
//         console.log(result);});

// ---------- q5 ----------
// import https from "https";

// function fetchData(url) {
//   return new Promise((res, rej) => {
//     https
//       .get(url, (response) => {
//         let data = "";
//         response.setEncoding("utf8");
//         response.on("data", (chunk) => {
//           data += chunk;
//         });
//         response.on("end", () => {
//           res(data);
//         });
//         response.on("error", rej);
//       })
//       .on("error", rej);
//   });
// }

// const url = "https://jsonplaceholder.typicode.com/todos/1";

// fetchData(url)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// ---------- q6 ----------
// function waitAll(){
//     const promise1 = new Promise((res) => {
//         setTimeout(() => {
//             res("First");
//         }, 1000);
//     });

//     const promise2 = new Promise((res) => {
//         setTimeout(() => {
//             res("Second");
//         }, 2000);
//     });
//     const promise3 = new Promise((res) => {
//         setTimeout(() => {
//             res("Third");
//         }, 3000);
//     });

//     return Promise.all([promise1, promise2, promise3]);
// }

// waitAll()
//     .then((results) => {
//         console.log(results);
//     }).catch((error) => {
//         console.error(error);
//     });

//// ---------- q7 ----------
// import fs from "fs";
// function checkFileExists(path){
//     return new Promise((res, rej) => {
//         fs.access(path,  (err) => {
//             if (err) {
//                 rej(false);
//             } else {
//                 res(true);
//             }
//         });
//     });
// }
// checkFileExists("./file.txt")
//     .then((exists) => {
//         console.log(`File exists: ${exists}`);})
//     .catch((error) => {
//         console.error(error);
//     });

//// ---------- q8 ----------
// function chainedGreetings() {
//   let delayFunction = (message, delay) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(message);
//         resolve();
//       }, delay);
//     });
//   };
//   delayFunction("Hi!", 1000)
//     .then(() => delayFunction("How are you?", 2000))
//     .then(() => delayFunction("Goodbye!", 1000));
// }
// chainedGreetings();

//// ---------- q9 ----------
// import fs from "fs";
// function processFile(inputPath, outputPath) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(inputPath, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// }
// processFile("./file.txt", "./output.txt")
//   .then((data) => {
//     let dataLength = data.split(/\s+/).length;
//     console.log(
//       `Word count written to output.txt: ${dataLength} words`,
//     );
//     return dataLength;
//   })
//   .then((len) =>
//     fs.writeFile("./output.txt", `Word count: ${len}`, (err) => {
//       if (err) {
//         console.error(err);
//       }
//     }),
//   )
//   .catch((err) => {
//     console.error(err);
//   });

//// --------- q10 ----------
// import https from "https";

// function getUserTitle(userId) {
//   let url = `https://jsonplaceholder.typicode.com/todos/${userId}`;
//   return fetchData(url).then((data) => {
//     return JSON.parse(data);
//   })
//     .then((jData) => {
//       console.log(`User ${userId}'s title: ${jData.title}`);
//       return;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
// getUserTitle(4);