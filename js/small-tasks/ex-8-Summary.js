function oddIndexSum(numsArr) {
  return numsArr
    .filter((num, index) => index % 2 !== 0)
    .reduce((sum, num) => sum + num, 0);
}

function maxMinusMin(numsArr) {
  return Math.max(...numsArr) - Math.min(...numsArr);
}

function capitalizeFirstLetter(str) {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function countObjectKeyswithValuesAboveX(object, x) {
  return Object.keys(object).filter((key) => object[key] > x).length;
}

function reverseArrayWithoutUsingBuiltInFunc(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(arr[i]);
  }

  return result;
}

class Student {
  #name;
  #grade;
  constructor(name, grade) {
    this.#name = name;
    this.#grade = grade;
  }
  passed() {
    return this.#grade >= 60;
  }
}
function isPassed(students) {
  return students.filter((student) => student.passed()).length;
}

function productOfAllExceptCurrent(numsArr) {
  return numsArr.map((num, index) =>
    numsArr
      .filter((n, i) => i !== index)
      .reduce((product, otherNum) => product * otherNum, 1),
  );
}

function findLongestWord(str) {
  let words = str.split(" ");
  let longestWords = words.filter(
    (w) => w.length === Math.max(...words.map((word) => word.length)),
  );
  return longestWords.length > 1 ? longestWords : longestWords[0];
}

function objectInversion(obj) {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[value] = key;
  }
  return result;
}
class BankAccount {
  #balance;
  constructor(balance) {
    this.#balance = balance;
  }
  deposit(amount) {
    this.#balance =
      this.#balance + amount > 0 ? this.#balance + amount : this.#balance;
  }
  withdraw(amount) {
    this.#balance =
      this.#balance - amount > 0 ? this.#balance - amount : this.#balance;
  }
  getBalance() {
    return this.#balance;
  }
}


console.log("1. oddIndexSum | Input: [10, 20, 30, 40] | Output:", oddIndexSum([10, 20, 30, 40]));

console.log("2. maxMinusMin | Input: [5, 20, 3, 15] | Output:", maxMinusMin([5, 20, 3, 15]));

console.log("3. capitalizeFirstLetter | Input: 'hello world' | Output:", capitalizeFirstLetter("hello world"));

console.log("4. countObjectKeyswithValuesAboveX | Input: {a:10, b:30, c:5}, x=8 | Output:", countObjectKeyswithValuesAboveX({a:10, b:30, c:5}, 8));

console.log("5. reverseArrayWithoutUsingBuiltInFunc | Input: [1, 2, 3] | Output:", reverseArrayWithoutUsingBuiltInFunc([1, 2, 3]));

const students = [
  new Student("Dan", 90),
  new Student("Noa", 50),
  new Student("Avi", 70)
];
console.log("6. isPassed | Input: Dan=90, Noa=50, Avi=70 | Output:", isPassed(students));

console.log("7. productOfAllExceptCurrent | Input: [1, 2, 3, 4] | Output:", productOfAllExceptCurrent([1, 2, 3, 4]));

console.log("8. findLongestWord | Input: 'hello javascript world' | Output:", findLongestWord("hello javascript world"));

console.log("9. objectInversion | Input: {a:'one', b:'two'} | Output:", objectInversion({a:"one", b:"two"}));

const account = new BankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log("10. BankAccount | Input: balance=100, deposit(50), withdraw(30) | Expected balance: 120");
