class Player {
  #name;
  #times;
  constructor(name, times = []) {
    this.#name = name;
    this.#times = times;
  }
  recordTime(time) {
    this.#times.push(time);
  }
  showStats() {
    let total = this.#times.reduce((acc, time) => acc + time, 0);
    console.log(
      `Total time: ${total} seconds \nAverage per riddle: ${total / this.#times.length} seconds`,
    );
  }
  getTimes() {
    return this.#times;
  }
}
export { Player };