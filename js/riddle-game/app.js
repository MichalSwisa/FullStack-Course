import AllRiddles from "./riddles/index.js";
import readline from "readline-sync";
import { Player, Riddle, MultipleChoiceRiddle } from "./classes/index.js";
import fs from "node:fs";
import { log } from "node:console";

function shuffleRiddles(riddles) {
  for (let i = riddles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [riddles[i], riddles[j]] = [riddles[j], riddles[i]];
  }

  return riddles;
}
function loadProgress() {
  try {
    const data = fs.readFileSync("progress.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
function saveProgress(playersProgress) {
  fs.writeFileSync("progress.json", JSON.stringify(playersProgress));
}

let player;
let difficultyLevel;
let difficulty;
let solvedRiddles = [];
const playersProgress = loadProgress();
const name = readline.question(
  "Welcome to the Riddle Game! \nWhat is your name? ",
);

const playerData = playersProgress.find((p) => p.name === name);
let status;
if (playerData) {
  const continueGame = readline.question(
    `Welcome back, ${name}! Would you like to continue your previous game? (yes/no)`,
  );
  if (continueGame.toLowerCase() === "yes") {
    difficultyLevel = playerData.difficultyLevel;
    difficulty = difficultyLevel!="none" ? "true" : "false";
    player = new Player(name, playerData.times);
    solvedRiddles = playerData.solvedRiddles || [];

    console.log(
      `Continuing your game with difficulty level: ${difficultyLevel!= "none" ? difficultyLevel : "all riddles"}`,
    );
  } else {
    status = "new";
  }
  
} else {
  status = "new";
}
if (status === "new") {
  player = new Player(name);

  difficulty = readline.question(
    "Enter true to play with difficulty levels, or false to play all riddles: ",
  );

  if (difficulty === "true") {
    difficultyLevel = readline.question(
      "Choose difficulty: easy / medium / hard: ",
    );
  }
}
//const player = new Player(name);

const riddles = shuffleRiddles(
  AllRiddles.filter(
    (riddle) =>
      (riddle.difficultyLevel === difficultyLevel || difficulty === "false") &&
      !solvedRiddles.some((solved) => solved.id === riddle.id),
  ).map((riddle) =>
    riddle.choices
      ? new MultipleChoiceRiddle(
          riddle.id,
          riddle.name,
          riddle.taskDescription,
          riddle.correctAnswer,
          riddle.difficultyLevel,
          riddle.timeLimit,
          riddle.hint,
          riddle.choices,
        )
      : new Riddle(
          riddle.id,
          riddle.name,
          riddle.taskDescription,
          riddle.correctAnswer,
          riddle.difficultyLevel,
          riddle.timeLimit,
          riddle.hint,
        ),
  ),
);

for (const riddle of riddles) {
  const time = riddle.ask();
  player.recordTime(time);

  solvedRiddles.push({
    id: riddle.getProperties().id,
    time: time,
  });

  const progress = {
    name: name,
    difficultyLevel: difficultyLevel || "none",
    solvedRiddles: solvedRiddles,
    times: player.getTimes(),
  };

  const existingIndex = playersProgress.findIndex((p) => p.name === name);

  if (existingIndex !== -1) {
    playersProgress[existingIndex] = progress;
  } else {
    playersProgress.push(progress);
  }

  saveProgress(playersProgress);
}
console.log(`Great job, ${name}!`);
player.showStats();
