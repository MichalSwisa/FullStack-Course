function doubleValues(arr) {
  return arr.map((num) => num * 2);
}
function onlyEvenValues(arr) {
  return arr.filter((num) => num % 2 === 0);
}

function showFirstAndLast(arr) {
  let lastElement = arr[arr.length - 1];
  return [String(arr[0]), String(lastElement)];
}

function vowelCount(str) {
  let vowels = ["A", "a", "E", "e", "U", "u", "O", "o", "I", "i"];
  let arr = str.split("");
  let result = {};
  arr.forEach((char) => {
    if (vowels.includes(char)) {
      result[char.toLowerCase()] = (result[char.toLowerCase()] || 0) + 1;
    }
  });
  return result;
}

function capitalize(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function shiftLetters(str) {
  return str
    .split("")
    .map((char) => {
      if (char === " ") {
        return char;
      } else if (char === "z") {
        return "a";
      } else if (char === "Z") {
        return "A";
      } else {
        return String.fromCharCode(char.charCodeAt(0) + 1);
      }
    })
    .join("");
}

function swapCase(str) {
  return str
    .split(" ")
    .map((word, index) => {
      if (index % 2 != 0) {
        return capitalize(word);
      } else {
        return word;
      }
    })
    .join(" ");
}

console.log(swapCase("ayh bll cd hjnm jdc jxnsjc"));
