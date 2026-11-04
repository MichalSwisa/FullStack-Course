// Basic Object Creation
console.log("---------- PART A ----------");
console.log("---------- ex1 ----------");
function Phone(brand, model) {
    this.brand = brand;
    this.model = model;
    this.details = function() {
        console.log(`Phone: ${this.brand} ${this.model}`);
    }
}
const phone1 = new Phone("Apple", "iPhone 13");
const phone2 = new Phone("Samsung", "Galaxy S21");
phone1.details();
phone2.details();

console.log("---------- ex2 ----------");
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    this.area = function() {
        return this.width * this.height;
    }
}
const rect1 = new Rectangle(5,4);
console.log(`Area of rect1: ${rect1.area()}`);

console.log("---------- ex3 ----------");
function BankAccount(owner, balance) {
    this.owner = owner;
    this.balance = balance;
    this.deposit = function(amount) {
        this.balance += amount;
        console.log(`Deposited: ${amount}. New balance: ${this.balance}`);
    }
    this.withdraw = function(amount) {
        if (amount <= this.balance) {
            this.balance -= amount; 
            console.log(`Withdrew: ${amount}. New balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient funds");
        }
    }
    this.checkBalance = function() {
        console.log(`Balance: ${this.balance}`);
    }
}
const account1 = new BankAccount("Alice", 1000);
account1.checkBalance();
account1.deposit(500);
account1.withdraw(2000);
account1.withdraw(300);

console.log("---------- PART B ----------");
console.log("---------- ex4 ----------");
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(`${this.name} makes a sound`);
};
function Dog(name) {
    Animal.call(this, name);
    this.bark = function() {
        console.log(`${this.name} barks`);
    };
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog("Buddy");
dog.speak(); // Buddy speaks
dog.bark();  // Buddy barks

console.log("---------- ex5 ----------");
function Vehicle(type) {
    this.type = type;
}
Vehicle.prototype.describe = function() {
    console.log(`This is a ${this.type}`);
};
function Car(brand) {
    Vehicle.call(this, "car");
    this.brand = brand;
    this.info = function() {
        console.log(`This is a ${this.brand} ${this.type}`);
    };
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
const myCar = new Car("Toyota");
myCar.describe();
myCar.info();

console.log("---------- ex6 ----------");
function Shape(){}
Shape.prototype.area = function() {
    return 0;
};
function Circle(radius){
    Shape.call(this);
    this.radius = radius;
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.area = function() {
    return Math.PI * this.radius * this.radius;
}
function Square(side){
    Shape.call(this);
    this.side = side;
}
Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;
Square.prototype.area = function() {
    return this.side * this.side;
};
const circle = new Circle(3);
console.log(`Area of circle: ${circle.area()}`);
const square = new Square(4);
console.log(`Area of square: ${square.area()}`);

console.log("---------- PART C ----------");
console.log("---------- ex7 ----------");
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
    info() {
        console.log(`${this.title} by ${this.author}`);
    }
}
const book1 = new Book("1984", "George Orwell");
book1.info();

console.log("---------- ex8 ----------");
class Person {
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
}
class Student extends Person {
    constructor(name, school) {
        super(name);
        this.school = school;
    }
    study() {
        console.log(`${this.name} is studying at ${this.school}`);
    }
}
const student1 = new Student("Alice", "MIT");
student1.greet();
student1.study();

console.log("---------- ex9 ----------");
class Employee {
    #salary;
    constructor(salary) {
        this.#salary = salary;
    }
    getSalary(){
        return this.#salary;
    }
    work() {
        console.log("Employee is working");
    }
}
class Manager extends Employee {
    constructor(salary) {
        super(salary);
    }
    work() {
        console.log("Manager is managing");
    }
}
const employee1 = new Employee(50000);
console.log(`Employee salary: ${employee1.getSalary()}`);
employee1.work();
const manager1 = new Manager(80000);
console.log(`Manager salary: ${manager1.getSalary()}`);
manager1.work();