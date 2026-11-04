// ----------- q1 -----------
import fs from "fs";
function readFilePromise(path) {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
}
//readFilePromise('./file.txt').then(console.log).catch(console.error);

// ----------- q2 -----------
async function readFileAsync(path) {
  return await fs.promises.readFile(path, "utf8");
}
//readFileAsync("./file.txt").then(console.log).catch(console.error);

// ----------- q3 -----------
async function getFileSize(path) {
  const stats = await fs.promises.stat(path);
  return stats.size;
}
//getFileSize('./file.txt').then(console.log).catch(console.error);

// ----------- q4 -----------
async function listFiles(dir) {
  return await fs.promises.readdir(dir);
}
//listFiles('./').then(console.log).catch(console.error);

// ----------- q5 -----------
async function readFilesInOrder(files) {
  for (const file of files) {
    const data = await fs.promises.readFile(file, "utf8");
    console.log(`Content of ${file}: \n${data}`);
  }
}
//readFilesInOrder(['file.txt', 'log.txt']).then(() => console.log('Files read in order. Check the console for results.'));

// ----------- q6 -----------
async function readFilesParallel(files) {
  const readPromises = files.map((file) => fs.promises.readFile(file, "utf8"));
  const results = await Promise.all(readPromises);
  results.forEach((data, index) =>
    console.log(`Content of ${files[index]}: \n${data}`),
  );
}
//readFilesParallel(['file.txt', 'log.txt']).then(() => console.log('Files read in parallel. Check the console for results.')).catch(console.error);

// ----------- q7 -----------
function fileExists(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
//fileExists('./fil.txt').then(console.log);

// ----------- q8 -----------
async function copyFile(src, dest) {
  try {
    await fs.promises.writeFile(dest, await fs.promises.readFile(src));
    console.log(`Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error);
  }
}
//copyFile('file.txt', 'copy.txt').then(() => console.log('Copy completed. Check copy.txt for results.')).catch(console.error);

// ----------- q9 -----------
async function mergeFiles(files, output) {
  try {
    const filescontent = await Promise.all(
      files.map((file) => fs.promises.readFile(file, "utf8")),
    );
    await fs.promises.writeFile(output, filescontent.join("\n"));
    console.log(`Merged files into ${output}`);
  } catch (error) {
    console.error(`Error merging files into ${output}`);
    console.error(error);
  }
}
//mergeFiles(['file.txt', 'quotes.txt'], 'merged.txt').then(() => console.log('Merge completed. Check merged.txt for results.'));

// ----------- q10 -----------
async function searchWordInFiles(dir, word) {
  try {
    const files = await fs.promises.readdir(dir);

    await Promise.all(
      files.map(async (file) => {
        const filestats = await fs.promises.lstat(`${dir}/${file}`);
        if (filestats.isFile()) {
          const data = await fs.promises.readFile(`${dir}/${file}`, "utf8");
          if (data.includes(word)) {
            await fs.promises.appendFile(
              "search_results.txt",
              `Found "${word}" in ${file}\n`,
            );
          }
        }
      }),
    );
  } catch (error) {
    console.error(`Error searching for "${word}" in ${dir}:`, error);
  }
}
//searchWordInFiles("./", "my").then(() => console.log("Search completed. Check search_results.txt for results."));
