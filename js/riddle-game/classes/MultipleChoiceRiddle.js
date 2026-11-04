import { Riddle } from "./Riddle.js";
import readline from "readline-sync";

class MultipleChoiceRiddle extends Riddle {
  #choices;
  constructor(
    id,
    name,
    taskDescription,
    correctAnswer,
    difficultyLevel,
    timeLimit,
    hint,
    choices,
  ) {
    super(
      id,
      name,
      taskDescription,
      correctAnswer,
      difficultyLevel,
      timeLimit,
      hint,
    );
    this.#choices = choices;
  }
  ask() {
    const {
      id,
      name,
      taskDescription,
      correctAnswer,
      difficultyLevel,
      timeLimit,
      hint,
    } = this.getProperties();
    let answer;
    let totalTime = 0;
    let penaltyTime = 0;
    const startTime = Date.now();
    do {
      console.log(`Riddle ${id}: ${name} \n${taskDescription}`);
      const options = [...this.#choices, "Hint - will cost 10 seconds"];

      answer = readline.keyInSelect(options, "Choices:", { cancel: false });

      if (answer + 1 == options.length - 1) {
        console.log(`Hint: ${hint}`);
        penaltyTime += 10000;
      } else {
        console.log("Incorrect.");
      }
    } while (answer + 1 != correctAnswer);
    console.log("Correct!");
    totalTime = Date.now() - startTime;
    if (totalTime > this.getProperties().timeLimit * 1000) {
      console.log(`Too slow! 5 seconds penalty applied.`);
      penaltyTime += 5000;
    }
    return totalTime + penaltyTime;
  }
}

export { MultipleChoiceRiddle };
