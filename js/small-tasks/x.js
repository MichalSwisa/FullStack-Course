function f1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("f1 done");
    }, 4000);
  });
}
function f2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 4000);
  });
}

function f3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 4000);
  });
}

f1()
  .then((result) => {
    console.log(result);
    return f2();
  }).then((result) => {
    console.log(result);
    return f3();
  }).then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

  f1().then(f2).then(f3).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.error(error);
  });
