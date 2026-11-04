import readline from "readline-sync";
class Riddle {
  #id;
  #name;
  #taskDescription;
  #correctAnswer;
  #difficultyLevel;
  #timeLimit;
  #hint;
  constructor(id, name, taskDescription, correctAnswer, difficultyLevel, timeLimit, hint) {
    this.#id = id;
    this.#name = name;
    this.#taskDescription = taskDescription;
    this.#correctAnswer = correctAnswer;
    this.#difficultyLevel = difficultyLevel;
    this.#timeLimit = timeLimit;
    this.#hint = hint;
  }
  ask() {
    let totalTime = 0;
    let penaltyTime = 0;
    const startTime = Date.now();
    let answer;

    do {
      answer = readline.question(
        `Riddle ${this.#id}: ${this.#name} \n${this.#taskDescription} \n You can type 'hint' to get a hint that will cost 10 seconds. \n `,
      );

      if (answer === this.#correctAnswer) {
        console.log("Correct!");
      } else if (answer === "hint") {
        console.log(`Hint: ${this.#hint}`);
        penaltyTime += 10000; 

      } else {
        console.log("Incorrect.");
      }
    } while (answer !== this.#correctAnswer);
    totalTime = Date.now() - startTime;
    if (totalTime > this.#timeLimit * 1000) {
      console.log(`Too slow! 5 seconds penalty applied.`);
      penaltyTime += 5000;
    }
    return totalTime + penaltyTime;
  }

  getProperties() { //for bonus
    return {
      id: this.#id,
      name: this.#name,
      taskDescription: this.#taskDescription,
      correctAnswer: this.#correctAnswer,
      difficultyLevel: this.#difficultyLevel,
      timeLimit: this.#timeLimit,
      hint: this.#hint,
    };
  }
}

export { Riddle };
