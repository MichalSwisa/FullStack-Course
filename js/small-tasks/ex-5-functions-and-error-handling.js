function ex1ExtractNumbers(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  return arr.filter((item) => typeof item === "number" && !Number.isNaN(item));
}

function ex2SumNumbersSafe(arr) {
  try {
    let numberArray = ex1ExtractNumbers(arr);
    let sum = numberArray.reduce((acc, num) => acc + num, 0);
    return sum;
  } catch (error) {
    console.log("Error in ex2SumNumbersSafe: " + error.message);
    return 0; // Return 0 in case of an error
  }
}

function ex3FilterLargeSums(arrList, minTotal) {
  let result = [];
  for (let i = 0; i < arrList.length; i++) {
    let sum = ex2SumNumbersSafe(arrList[i]);
    if (sum >= minTotal) {
      result.push(arrList[i]);
    }
  }
  return result;
}

function ex4SummaryStats(arrList) {
  let filtered = ex3FilterLargeSums(arrList, 10);
  let results = [];
  for (let i = 0; i < filtered.length; i++) {
    let numbers = ex1ExtractNumbers(filtered[i]);
    let sum = ex2SumNumbersSafe(numbers);
    let average = sum / numbers.length;
    results.push({ sum, average });
  }
  return results;
}

function ex5SafeCalculator(a, b, operation) {
  const validOperations = ["add", "subtract", "multiply", "divide"];
  if (!validOperations.includes(operation)) {
    throw new Error(
      "Invalid operation. Must be one of: " + validOperations.join(", "),
    );
  } else if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    Number.isNaN(a) ||
    Number.isNaN(b)
  ) {
    throw new Error("Both a and b must be numbers.");
  } else {
    switch (operation) {
      case "add":
        return a + b;
      case "subtract":
        return a - b;
      case "multiply":
        return a * b;
      case "divide":
        if (b === 0) {
          throw new Error("Division by zero is not allowed.");
        }
        return a / b;
      default:
        throw new Error("Invalid operation.");
    }
  }
}

console.log("ex1-extractNumbers"); // Throws an error
console.log(ex1ExtractNumbers([1, "a", 2, "b", 3])); // Output: [1, 2, 3]

console.log("ex2-sumNumbersSafe"); // Throws an error
console.log(ex2SumNumbersSafe('[1, "a", 2, 3]')); // Output: 6

console.log("ex3-filterLargeSums"); // Throws an error
console.log(
  ex3FilterLargeSums(
    [
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ],
    10,
  ),
); // Output: [[6, 7, 8]]

console.log("ex4-summaryStats"); // Throws an error
console.log(ex4SummaryStats([[1, 2, 3], [5, 5, 5], [100], "bad"])); // Output: [{ sum: 21, average: 7 }]
try {
  console.log("ex5-safeCalculator"); // Throws an error
  console.log(ex5SafeCalculator(10, 5, "add"));
} catch (error) {
  console.log("Error in ex5-safeCalculator: " + error.message);
}
