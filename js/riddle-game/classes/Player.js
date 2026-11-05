class Player {
    #id;
    #name;
    #times;
    constructor(name, times = [], id = crypto.randomUUID()) {
        this.#id = id;
        this.#name = name;
        this.#times = times;
    }
    recordTime(time) {
        this.#times.push(time);
    }
    showStats(lowestTime) {
        let total = this.#times.reduce((acc, time) => acc + time, 0);
        console.log(
            `Total time: ${total / 1000} seconds \nAverage per riddle: ${(total / this.#times.length) / 1000} seconds \nLowest time: ${lowestTime / 1000} seconds`,
        );
    }
    getTimes() {
        return this.#times;
    }
    getId() {
        return this.#id;
    }
    getName() {
        return this.#name;
    }
}
export { Player };