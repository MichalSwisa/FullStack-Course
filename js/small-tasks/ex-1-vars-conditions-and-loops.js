// ----------------------- q1 ----------------------- 
let x = 12345;
let sum = 0;
for (let i = 0; i < 5; i++) {
  sum = sum + (x % 10);
  x = parseInt(x / 10);
}
console.log(sum);

//q2
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

// ----------------------- q3 ----------------------- 
let x1 = Number(prompt("Enter a number:"));
let x2 = Number(prompt("Enter a number:"));
let x3 = Number(prompt("Enter a number:"));
let x4 = Number(prompt("Enter a number:"));
let x5 = Number(prompt("Enter a number:"));
let max = Math.max(x1, x2, x3, x4, x5);

console.log("The largest number is: " + max);

// ----------------------- q4 ----------------------- 
let x = Number(prompt("Enter a number:"));
let count = 0;
while (x > 0) {
  x = Math.floor(x / 10);
  count++;
}
console.log(count);

// ----------------------- q5 ----------------------- 
let start = Number(prompt("Enter a number:"));
let end = Number(prompt("Enter a number:"));
for (let i = start; i <= end; i++) {
  if (i % 2 == 0) {
    console.log(i);
  }
}

// ----------------------- q6 ----------------------- 
let x = Number(prompt("Enter a number:"));
let result = 0;
for (let i = 0; i < 4; i++) {
  result = result * 10 + (x % 10);
  x = Math.floor(x / 10);
}
console.log(result);

// ----------------------- q7 ----------------------- 
for (let i = 1; i < 6; i++) {
  let line = "";
  for (let j = 0; j < i; j++) {
    line += i;
  }
  console.log(line);
}

// ----------------------- q8 ----------------------- 
let x = Number(prompt("Enter a 3 digits number:"));
if (x % 10 == Math.floor(x / 100)) {
  console.log("Palindrome");
} else {
  console.log("Not a Palindrome");
}

// ----------------------- q9 ----------------------- 
let x = Number(prompt("Enter a number between 1 and 12:"));
for (let i = 1; i <= 10; i++) {
  console.log(`${x} + ${i} = ${x * i}`);
}

// ----------------------- q10 ----------------------- 
let x = Number(prompt("Enter a number"));
while (x != 1) {
  if (x % 2 == 0) {
    console.log(`${x} / 2 = ${x / 2}`);
    x = x / 2;
  } else {
    console.log(`${x} * 3 + 1= ${x * 3 + 1}`);
    x = x * 3 + 1;
  }
}



//let a1 = [];
//a1.push(1);
//a1.push("m");
//a1.push(8.9);
//a1.pop();
//console.log(a1);  //[1,"m"]

//let a1 = [];
//a1.splice(0,0, 1, 0.5, "v");
//a1.splice(2,1);
//console.log(a1);
