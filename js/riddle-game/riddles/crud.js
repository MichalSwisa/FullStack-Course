import readline from "readline-sync";
import { Player, Riddle, MultipleChoiceRiddle } from "../classes/index.js";

import fs from "node:fs";

export function createRiddle() {
    const riddlesArray = JSON.parse(fs.readFileSync("./riddles/db.txt", "utf8"));

    let newRiddle;
    const id = crypto.randomUUID();
    let riddleType;
    do {
        riddleType = readline.question(
            "Enter riddle type (multiple-choice - choose m or regular - choose r): ",
        );
    } while (riddleType !== "m" && riddleType !== "r");
    const riddleName = readline.question("Enter riddle name:");
    const taskDescription = readline.question("Enter the riddle question:");
    const correctAnswer = readline.question("Enter the correct answer:");
    let difficultyLevel;
    do {
        difficultyLevel = readline.question(
            "Enter difficulty level (easy, medium, hard): ",
        );
    } while (!["easy", "medium", "hard"].includes(difficultyLevel));
    const timeLimit = readline.questionInt("Enter time limit in seconds:");
    const hint = readline.question("Enter a hint for the riddle:");

    let choices = [];
    if (riddleType === "m") {
        const numChoices = readline.questionInt("Enter the number of choices:");
        for (let i = 0; i < numChoices; i++) {
            const choice = readline.question(`Enter choice ${i + 1}:`);
            choices.push(choice);
        }
        newRiddle = new MultipleChoiceRiddle(
            id,
            riddleName,
            taskDescription,
            correctAnswer,
            difficultyLevel,
            timeLimit,
            hint,
            choices,
        );
    } else {
        newRiddle = new Riddle(
            id,
            riddleName,
            taskDescription,
            correctAnswer,
            difficultyLevel,
            timeLimit,
            hint,
        );
    }

    riddlesArray.push(newRiddle.getProperties());

    fs.writeFileSync("./riddles/db.txt", JSON.stringify(riddlesArray, null, 2));
    console.log("The new riddle gets saved to db.txt");
    return newRiddle;
}

export function readRiddles() {
    const riddlesArray = JSON.parse(fs.readFileSync("./riddles/db.txt", "utf8"));
    console.log("Riddles in db.txt:");
    riddlesArray.forEach((riddle, index) => {
        console.log(`Riddle ${index + 1}:`, riddle);
    });
}

export function updateRiddle(riddleId) {
    let updatedProperties;
    do {
        try {
            updatedProperties = JSON.parse(
                readline.question(
                    'Enter the properties to update in JSON format (e.g., {"name": "New Name", "timeLimit": 60}, you can\'t change the ID): ',
                ),
            );
        } catch (error) {
            console.error("Error parsing JSON:", error.message);
        }
    } while (updatedProperties === null || typeof updatedProperties !== "object" || Array.isArray(updatedProperties));

    delete updatedProperties.id;

    const riddlesArray = JSON.parse(fs.readFileSync("./riddles/db.txt", "utf8"));
    const riddleIndex = riddlesArray.findIndex(
        (riddle) => String(riddle.id) === String(riddleId),
    );
    if (riddleIndex === -1) {
        console.log(`Riddle with ID ${riddleId} not found.`);
        return;
    }
    riddlesArray[riddleIndex] = {
        ...riddlesArray[riddleIndex],
        ...updatedProperties,
    };
    fs.writeFileSync("./riddles/db.txt", JSON.stringify(riddlesArray, null, 2));
    console.log(`Riddle with ID ${riddleId} updated successfully.`);
}

export function deleteRiddle(riddleId) {
    const riddlesArray = JSON.parse(fs.readFileSync("./riddles/db.txt", "utf8"));
    const riddleIndex = riddlesArray.findIndex(
        (riddle) => String(riddle.id) === String(riddleId),
    );
    if (riddleIndex === -1) {
        console.log(`Riddle with ID ${riddleId} not found.`);
        return;
    }
    riddlesArray.splice(riddleIndex, 1);
    fs.writeFileSync("./riddles/db.txt", JSON.stringify(riddlesArray, null, 2));
    console.log(`Riddle with ID ${riddleId} deleted successfully.`);
}