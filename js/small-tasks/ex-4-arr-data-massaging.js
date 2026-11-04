function getNames(data) {
  return data.map((person) => person.name);
}

function birthYearsBefore1990(data) {
    return data.filter((person) => {
        const year = parseInt(person.birthday.split('-')[2]);
        return year < 1990;
    });
}

function foodsCount(data) {
    const foodCount = {};
    data.forEach((person) => {
        Object.keys(person.favoriteFoods).forEach((foodType) => {
            person.favoriteFoods[foodType].forEach((food) => {
                foodCount[food] = (foodCount[food] || 0) + 1;
            });
        });
    });
    return foodCount;
}

const data = [
  {
    name: "John",
    birthday: "1-1-1995",
    favoriteFoods: {
      meats: ["hamburgers", "sausages"],
      fish: ["salmon", "pike"],
    },
  },
  {
    name: "Mark",
    birthday: "10-5-1980",
    favoriteFoods: {
      meats: ["hamburgers", "steak", "lamb"],
      fish: ["tuna", "salmon", "barracuda"],
    },
  },
  {
    name: "Mary",
    birthday: "1-10-1977",
    favoriteFoods: {
      meats: ["cow", "chicken"],
      fish: ["pike"],
    },
  },
  {
    name: "Thomas",
    birthday: "1-10-1990",
    favoriteFoods: {
      meats: ["bird", "rooster"],
      fish: ["salmon"],
    },
  },
  {
    name: "Mary",
    birthday: "1-10-1977",
    favoriteFoods: {
      meats: ["hamburgers", "lamb"],
      fish: ["bass", "tuna"],
    },
  },
];

console.log(getNames(data));
console.dir(birthYearsBefore1990(data), { depth: null });
console.log(foodsCount(data));



function sumAges(str) {
    const parts = str.replace(/\s+/g, ' ').trim().split(" ");
    let total = 0;
    for (let i = 0; i < parts.length; i++) {
        total += parseInt(parts[i])
    }
    return total;
}

console.log(sumAges("10  20   30 "));