function f1() {
  //Variable Swap Without Temp
  let a = "some string";
  let b = "other string";
  console.log("Before:");
  console.log(a);
  console.log(b);

  [a, b] = [b, a];

  console.log("After:");
  console.log(a);
  console.log(b);
}

function f2(grid) {
  //2D Grid Count
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "X") {
        count++;
        console.log(`Found X at [${i}][${j}]`);
      }
    }
  }
  console.log(`Total X found: ${count}`);
}

function f3() {
  //Nested Object Read
  let family = {
    parents: {},
    children: [{ name: "Ali" }, { name: "Lea" }, { name: "Mona" }],
  };
  console.log(family.children[2].name);
  childs = family.children;
  console.log(`All sibilings: ${childs.map((child) => child.name).join(", ")}`);
}

function f4() {
  //Manual Reverse
  let arr = [1, 2, 3, 4, 5];
  len = arr.length;
  for (let i = 0; i < len; i++) {
    arr.splice(i, 0, arr.pop());
  }
  console.log(arr);
}

function f5() {
  //Type Collector
  let arr = [1, "m", true, 2, "n", false, 3, "o", true, null, { n: "object" }];
  let types = {};
  for (let i = 0; i < arr.length; i++) {
    let type = arr[i] === null ? "null" : typeof arr[i];
    types[type] = (types[type] || 0) + 1;
  }
  for (let key in types) {
    console.log(`Type: ${key}, Count: ${types[key]}`);
  }
}

function f6() {
  //Filter Without .filter()
  let arr = [1, 2, 3, 4, 5, 405, 390, 89, 1000, 2000];
  let filtered = [];
  let comparisons = 0;
  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    if (arr[i] > 100) {
      filtered.push(arr[i]);
    }
  }
  console.log(filtered);
  console.log(`Total comparisons made: ${comparisons}`);
}

function f7() {
  //Conditional Object Filler
  let obj = { even: [], odd: [] };
  let divisibleBy2And3 = 0;
  for (let i = 0; i < 50; i++) {
    if (i % 2 === 0) {
      obj.even.push(i);
      divisibleBy2And3++;
    } else {
      obj.odd.push(i);
      if (i % 3 === 0) {
        divisibleBy2And3++;
      }
    }
  }
  console.log(obj);
  console.log(`Total numbers divisible by 2 or 3: ${divisibleBy2And3}`);
}

function f8() {
  //Grid Checker
  let grid = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (i === j) {
        grid[i][j] = "#";
      }
      if (i + j === grid.length - 1) {
        grid[i][j] = "#";
      }
    }
  }
  console.log(grid);
}

function f9() {
  //Frequency Counter
  let str = "hello world";
  let freq = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let code = char.charCodeAt(0);

    if (
      (code >= 32 && code <= 47) ||
      (code >= 58 && code <= 64) ||
      (code >= 91 && code <= 96) ||
      (code >= 123 && code <= 126)
    ) {
      continue;
    }
    freq[char] = (freq[char] || 0) + 1;
  }
  for (let key in freq) {
    console.log(`Character: ${key}, Frequency: ${freq[key]}`);
  }
}

function f10() {
  //Flattening Matrix
  let matrix = [
    [1, 2, 3],
    [4, -5, 6],
    [7, 8, 9],
  ];
  let flat = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] >= 0) {
        flat.push(matrix[i][j]);
      }
    }
  }
  console.log(flat);
}

function f11() {
  //Object Key Transformer
  let obj = { b: 1, A: 2, C: 3, d: 4 };
  let keys = Object.keys(obj);
  for (let key of keys) {
    if (key != key.toUpperCase()) {
      let newKey = key.toUpperCase();
      obj[newKey] = obj[key];
      delete obj[key];
    }
  }

  let sortedKeys = Object.keys(obj).sort();
  let sortedObj = {};

  for (let key of sortedKeys) {
    sortedObj[key] = obj[key];
  }

  console.log(sortedObj);
}

function f12() {
  //Triangular Loop Output
  let x = 5;
  let y = 1;
  while (x > 0) {
    let line = "";
    for (let i = y; i > 0; i--) {
      line += "*";
    }
    console.log(line);
    y++;
    x--;
  }
}

function f13() {
  //Match Two Arrays
  let arr1 = [1, 2, 3, 4, 5, 5];
  let arr2 = [4, 5, 6, 7, 8];
  let matches = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j] && !matches.includes(arr1[i])) {
        matches.push(arr1[i]);
      }
    }
  }
  console.log(matches);
  console.log(matches.length);
}

function f14() {
  // Key-Value Reverser
  let obj = { a: 1, b: 2, c: 3, d: [4, 5, 6] };
  let reversed = {};
  for (let key in obj) {
    let value = obj[key];
    if (typeof value === "string" || typeof value === "number") {
      reversed[value] = key;
    } else {
      reversed[key] = value;
    }
  }
  console.log(reversed);
}

function f15() {
  // Identity Grid
  let size = 5;
  let grid = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    if (i == 2) {
      row = [9, 9, 9, 9, 9];
    } else {
      for (let j = 0; j < size; j++) {
        if (i === j) {
          row.push(1);
        } else {
          row.push(0);
        }
      }
    }
    grid.push(row);
  }
  console.log(grid);
}

function f16() {
  // Object Conditions
  const users = [
    { name: "Daniel", age: 25, status: "active" },
    { name: "Noa", age: 16, status: "inactive" },
    { name: "Amit", age: 19, status: "active" },
    { name: "Sarah", age: 17, status: "active" },
    { name: "David", age: 30, status: "inactive" },
    { name: "Maya", age: 15, status: "inactive" },
    { name: "Yossi", age: 18, status: "active" },
    { name: "Rachel", age: 22, status: "active" },
    { name: "Omer", age: 14, status: "inactive" },
    { name: "Tamar", age: 28, status: "inactive" },
  ];
  let count = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 18 && users[i].status === "active") {
      console.log(users[i].name);
    } else if (users[i].age < 18 && users[i].status === "inactive") {
      count++;
    }
  }
  console.log(`Total inactive users under 18: ${count}`);
}

function f17() {
  //Manual Min/Max
  let arr = [5, 3, 8, 1, 4];
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  console.log(`Min: ${min}, Max: ${max}`);
}

function f18() {
  //Rotating Array [1, 2, 3] → [2, 3, 1]
  let arr = [1, 2, 3, 4, 5];
  let rotations = 3; // Number of rotations
  for (let i = 0; i < rotations; i++) {
    let first = arr.shift();
    arr.push(first);
  }
  console.log(arr);
}

function f19() {
  //Manual JSON Print
  const obj = {
    name: "Daniel",
    age: 24,
    city: "Jerusalem",
    isStudent: true,
    height: 1.78,
    job: null,
  };
  let jsonString = "{\n";
  for (let key in obj) {
    jsonString += `  "${key}": ${typeof obj[key] === "string" ? `"${obj[key]}"` : obj[key]},\n`;
  }
  jsonString = jsonString.slice(0, -2) + "\n}";
  console.log(jsonString);
}

function f20() {
  // Complex Board Validator
  const board = [
    ["0", "X", "0", "X"],
    ["X", "0", "X", "0"],
    ["0", "0", "0", "X"],
    ["0", "X", "X", "0"],
  ];
  for (let i = 0; i < board.length; i++) {
    let count = board[i].filter((x) => x === "0").length;
    if (count > 2) {
      console.log(`Row ${i} has more than 2 zeros.`);
    }
    let zeroCount = 0;
    for (let j = 0; j < board[i].length; j++) {
      if (board[j][i] === "0") {
        zeroCount++;
      }
      if (zeroCount > 2) {
        console.log(`Column ${i} has more than 2 zeros.`);
      }
    }
  }
}


//f1();

// let grid = [
//   ["X", "x", "X", "X", "x"],
//   ["x", "X", "X", "x", "X"],
//   ["x", "X", "X", "x", "x"],
//   ["X", "X", "x", "x", "X"],
//   ["x", "X", "X", "x", "x"],
// ];
// f2(grid);

//f3();

//f4();

//f5();

//f6();

//f7();

//f8();

//f9();

//f10();

//f11();

//f12();

//f13();

//f14();

//f15();

//f16();

//f17();

//f18();

//f19();

//f20();

