import readline from "readline-sync";
import { Player, Riddle, MultipleChoiceRiddle } from "./classes/index.js";
import { createRiddle, readRiddles, updateRiddle, deleteRiddle } from "./riddles/crud.js";
import fs from "node:fs";

let AllRiddles = loadRiddles();

function shuffleRiddles(riddles) {
    for (let i = riddles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [riddles[i], riddles[j]] = [riddles[j], riddles[i]];
    }

    return riddles;
}
function loadProgress() {
    try {
        const data = fs.readFileSync("./players/players.txt", "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveProgress(playersProgress) {
    fs.writeFileSync("./players/players.txt", JSON.stringify(playersProgress, null, 4));
}

function loadRiddles() {
    const data = fs.readFileSync("./riddles/db.txt", "utf8");
    return JSON.parse(data);
}

function viewLeaderboard() {
    const playersProgress = loadProgress();
    if (playersProgress.length === 0) {
        console.log("No players found.");
        return;
    }

    const sortedPlayers = playersProgress.filter((player) => player.lowestTime != null).sort((a, b) => a.lowestTime - b.lowestTime);
    console.log("Leaderboard:");
    sortedPlayers.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} - ${player.lowestTime / 1000} seconds`);
    });
}

function gameSetup() {
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
    let continueGame;
    if (playerData) {
        do {
            continueGame = readline.question(
                `Welcome back, ${name}! \n Your previous last time was ${playerData.lowestTime / 1000} seconds\nWould you like to continue your previous game? (yes/no)`,
            );
            if (continueGame.toLowerCase() === "yes") {
                difficultyLevel = playerData.difficultyLevel;
                difficulty = difficultyLevel != "none" ? "true" : "false";
                player = new Player(name, playerData.times, playerData.id);
                solvedRiddles = playerData.solvedRiddles || [];
                console.log(
                    `Continuing your game with difficulty level: ${difficultyLevel != "none" ? difficultyLevel : "all riddles"}`,
                );
                return { player, difficultyLevel, difficulty, solvedRiddles, playersProgress };

            } else {
                status = "new";
            }
        } while (continueGame.toLowerCase() !== "yes" && continueGame.toLowerCase() !== "no");
    } else {
        status = "new";
    }

    if (status === "new") {
        player = new Player(name, [], playerData?.id);

        do {
            difficulty = readline.question(
                "Enter true to play with difficulty levels, or false to play all riddles: ",
            ).toLowerCase();
        } while (difficulty !== "true" && difficulty !== "false");

        if (difficulty === "true") {
            do {

                difficultyLevel = readline.question(
                    "Choose difficulty: easy / medium / hard: ",
                ).toLowerCase();

            } while (!["easy", "medium", "hard"].includes(difficultyLevel.toLowerCase()));
        }
        else {
            difficultyLevel = "none";
        }
        if (playerData) {
            const playerIndex = playersProgress.findIndex(
                (p) => p.name === name
            );

            playersProgress[playerIndex] = {
                id: player.getId(),
                name: name,
                difficultyLevel: difficultyLevel,
                solvedRiddles: [],
                times: [],
                lowestTime: playerData.lowestTime
            };

            saveProgress(playersProgress);
        }
        return { player, difficultyLevel, difficulty, solvedRiddles, playersProgress };
    }
}

function playGame({ player, difficultyLevel, difficulty, solvedRiddles, playersProgress }) {
    //const player = new Player(name);
    const riddles = shuffleRiddles(
        AllRiddles.filter(
            (riddle) =>
                (riddle.difficultyLevel === difficultyLevel ||
                    difficulty === "false") &&
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

    if (riddles.length === 0) {
        console.log(
            `No more riddles available for the chosen difficulty level: ${difficultyLevel}.`,
        );
        const playerData = playersProgress.find(
            (p) => p.name === player.getName()
        );

        player.showStats(playerData?.lowestTime);
        return;
    }

    for (const riddle of riddles) {
        const time = riddle.ask();
        player.recordTime(time);

        solvedRiddles.push({
            id: riddle.getProperties().id,
            time: time,
        });
        const previousPlayer = playersProgress.find(
            (p) => p.name === player.getName()
        );

        const progress = {
            id: player.getId(),
            name: player.getName(),
            difficultyLevel: difficultyLevel || "none",
            solvedRiddles: solvedRiddles,
            times: player.getTimes(),
            lowestTime: previousPlayer?.lowestTime ?? null,
        };

        const existingIndex = playersProgress.findIndex((p) => p.name === player.getName());

        if (existingIndex !== -1) {
            playersProgress[existingIndex] = progress;
        } else {
            playersProgress.push(progress);
        }

        saveProgress(playersProgress);
    }
    const totalTime = player.getTimes().reduce((sum, time) => sum + time, 0);

    const playerIndex = playersProgress.findIndex(
        (p) => p.name === player.getName()
    );

    if (playerIndex !== -1) {
        const previousBest = playersProgress[playerIndex].lowestTime;

        playersProgress[playerIndex].lowestTime =
            previousBest == null
                ? totalTime
                : Math.min(previousBest, totalTime);

        saveProgress(playersProgress);
    }
    console.log(`Great job, ${player.getName()}!`);

    player.showStats(playersProgress[playerIndex].lowestTime);
}

function main() {
    let inputUser;
    do {
        const options = [
            "Play the game",
            "Create a new riddle",
            "Read all riddles",
            "Update an existing riddle",
            "Delete a riddle",
            "View leaderboard",
        ];
        inputUser = readline.keyInSelect(options, "What do you want to do?");
        switch (inputUser) {
            case 0:
                playGame(gameSetup());
                break;
            case 1:
                createRiddle();
                AllRiddles = loadRiddles();
                break;
            case 2:
                readRiddles();
                break;
            case 3:
                const riddleId = readline.question("Enter the ID of the riddle to update: ");
                updateRiddle(riddleId);
                AllRiddles = loadRiddles();
                break;
            case 4:
                const riddleIdToDelete = readline.question("Enter the ID of the riddle to delete: ");
                deleteRiddle(riddleIdToDelete);
                AllRiddles = loadRiddles();
                break;
            case 5:
                viewLeaderboard();
                break;
            default:
                inputUser = -1;
                console.log("Goodbye!");
        }
    } while (inputUser !== -1);
}
main();
