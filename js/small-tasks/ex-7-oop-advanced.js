console.log("---------- PART A ----------");
class MediaItem {
  #title;
  #year;
  #genre;
  constructor(title, year, genre) {
    this.#title = title;
    this.#year = year;
    this.#genre = genre;
  }
  getSummary() {
    return `${this.#title} (${this.#year}) - Genre: ${this.#genre}`;
  }
  getTitle() {
    return this.#title;
  }
  getGenre() {
    return this.#genre;
  }
}

class Book extends MediaItem {
  #author;
  #pageCount;
  constructor(title, author, year, genre, pageCount) {
    super(title, year, genre);
    this.#author = author;
    this.#pageCount = pageCount;
  }
  getSummary() {
    return `Book: '${this.getTitle()}' by ${this.#author}, ${this.#pageCount} pages`;
  }
}

class Movie extends MediaItem {
  #director;
  #durationMinutes;
  constructor(title, director, year, genre, durationMinutes) {
    super(title, year, genre);
    this.#director = director;
    this.#durationMinutes = durationMinutes;
  }
  getSummary() {
    return `Movie: '${this.getTitle()}' directed by ${this.#director}, ${this.#durationMinutes} minutes`;
  }
}

class Library {
  #items;
  constructor() {
    this.#items = [];
  }
  addItem(item) {
    this.#items.push(item);
  }
  search(term) {
    return this.#items.filter((item) =>
      item.getTitle().toLowerCase().includes(term.toLowerCase()),
    );
  }
  listByGenre(genre) {
    return this.#items.filter(
      (item) => item.getGenre().toLowerCase() === genre.toLowerCase(),
    );
  }
}

const lib = new Library();
lib.addItem(new Book("Dune", "Frank Herbert", 1965, "Sci-Fi", 412));
lib.addItem(new Movie("Dune", "Denis Villeneuve", 2021, "Sci-Fi", 155));
console.log(lib.search("dune"));
console.log(lib.listByGenre("Sci-Fi"));
console.log(" ");

console.log("---------- PART B ----------");
class BankAccount {
  #owner;
  #balance;
  constructor(owner, balance) {
    this.#owner = owner;
    this.#balance = balance;
  }
  deposit(amount) {
    this.#balance += amount;
    console.log(`Deposited: ${amount}. New balance: ${this.#balance}`);
  }
  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`Withdrew: ${amount}. New balance: ${this.#balance}`);
    } else {
      console.log("Insufficient funds");
    }
  }
  getProperties() {
    return {
      owner: this.#owner,
      balance: this.#balance,
    };
  }
}

class Bank {
  #accounts;
  constructor() {
    this.#accounts = [];
  }
  addAccount(account) {
    this.#accounts.push(account);
  }
  transfer(fromName, toName, amount) {
    const fromAccount = this.#accounts.find(
      (account) => account.getProperties().owner === fromName,
    );
    const toAccount = this.#accounts.find(
      (account) => account.getProperties().owner === toName,
    );
    if (fromAccount && toAccount) {
      if (fromAccount.getProperties().balance >= amount) {
        fromAccount.withdraw(amount);
        toAccount.deposit(amount);
        console.log(`Transferred ${amount} from ${fromName} to ${toName}`);
      } else {
        console.log("Insufficient funds for transfer");
      }
    } else {
      console.log("One or both accounts not found");
    }
  }
  showBalance() {
    this.#accounts.forEach((account) => {
      console.log(
        `${account.getProperties().owner}: ${account.getProperties().balance}`,
      );
    });
  }
}
const readline = require("readline-sync");
const bank = new Bank();
let userInput = readline.keyInSelect(
  ["Add Account", "Transfer Funds", "Show Balances"],
  "Choose an action:",
);
do {
  switch (userInput) {
    case 0:
      const owner = readline.question("Enter account owner name: ");
      const balance = readline.questionFloat("Enter initial balance: ");
      const account = new BankAccount(owner, balance);
      bank.addAccount(account);
      break;
    case 1:
      const fromName = readline.question("Enter sender's name: ");
      const toName = readline.question("Enter recipient's name: ");
      const amount = readline.questionFloat("Enter amount to transfer: ");
      bank.transfer(fromName, toName, amount);
      break;
    case 2:
      bank.showBalance();
      break;
  }
  userInput = readline.keyInSelect(
    ["Add Account", "Transfer Funds", "Show Balances"],
    "Choose an action:",
  );
} while (userInput !== -1);

console.log("---------- PART C ----------");
class Animal {
  #name;
  #species;
  #lastFedTime;
  constructor(name, species, lastFedTime) {
    this.#name = name;
    this.#species = species;
    this.#lastFedTime = lastFedTime;
  }
  feed() {
    this.#lastFedTime = new Date();
  }
  getSpecies() {
    return this.#species;
  }
  getName() {
    return this.#name;
  }
  getlastFedTime() {
    return this.#lastFedTime;
  }
}

class Carnivore extends Animal {
  constructor(name, species) {
    super(name, species, null);
  }
  feed() {
    super.feed();
    console.log(`Feeding carnivore ${this.getSpecies()} - meat served.`);
  }
}
class Herbivore extends Animal {
  constructor(name, species) {
    super(name, species, null);
  }
  feed() {
    super.feed();
    console.log(`Feeding herbivore ${this.getSpecies()} - plants served.`);
  }
}
class ZooKeeper {
  #animals;
  constructor() {
    this.#animals = [];
  }
  addAnimal(animal) {
    this.#animals.push(animal);
  }
  feedAll() {
    this.#animals.forEach((animal) => {
      animal.feed();
    });
  }
  getLastFed(name) {
    const animal = this.#animals.find((a) => a.getName() === name);
    if (animal) {
      return animal.getlastFedTime();
    } else {
      console.log(`No animal found with the name ${name}`);
    }
  }
  getBySpecies(species) {
    return this.#animals.filter(
        animal => animal.getSpecies() === species
    );
  }
}
const zoo = new ZooKeeper();
zoo.addAnimal(new Carnivore("Simba", "Lion"));
zoo.addAnimal(new Herbivore("Longneck", "Giraffe"));

zoo.feedAll();
console.log(zoo.getLastFed("Simba"));
