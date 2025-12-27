export {};
/****************************************************************************************
 * 1. Functions are VALUES in JavaScript
 * 2. Functions can be:
 *    - called
 *    - assigned
 *    - passed
 *    - returned
 *
 * TypeScript ADDS TYPES on top of JavaScript functions.
 *
 * JS decides HOW functions run
 * TS decides WHETHER usage is correct
 ****************************************************************************************/


/****************************************************************************************
 * FUNCTION BASICS
 ****************************************************************************************/

// Basic function with parameter & return type
function add(a: number, b: number): number {
  return a + b;
}

// TypeScript can INFER return type
function multiply(a: number, b: number) {
  return a * b; // inferred as number
}

// Function with no return value
function logMessage(msg: string): void {
  console.log(msg);
}



/****************************************************************************************
 * FUNCTION EXPRESSION
 ****************************************************************************************/

// Function assigned to a variable
const subtract = function (a: number, b: number): number {
  return a - b;
};

// Arrow function (most common in modern TS)
const divide = (a: number, b: number): number => {
  return a / b;
};

// Short arrow function
const square = (n: number) => n * n;



/****************************************************************************************
 * FUNCTION TYPES (VERY IMPORTANT)
 ****************************************************************************************/

// Explicit function type
type MathOperation = (a: number, b: number) => number;

const addFn: MathOperation = (a, b) => a + b;
const mulFn: MathOperation = (a, b) => a * b;

// Function type interface (also valid)
interface Logger {
  (message: string): void;
}

const log: Logger = (msg) => console.log(msg);



/****************************************************************************************
 * OPTIONAL PARAMETERS
 ****************************************************************************************/

// Optional parameter
function greet(name?: string) {
  if (name) {
    console.log(`Hello ${name}`);
  } else {
    console.log("Hello Guest");
  }
}

// Optional parameters must come AFTER required ones
function greetWithTitle(name: string, title?: string) {
  console.log(`${title ?? "Mr/Ms"} ${name}`);
}



/****************************************************************************************
 * DEFAULT PARAMETERS
 ****************************************************************************************/

function createUser(name: string, isAdmin: boolean = false) {
  return { name, isAdmin };
}

createUser("Alice");        // isAdmin = false
createUser("Bob", true);    // isAdmin = true



/****************************************************************************************
 * REST PARAMETERS
 ****************************************************************************************/

// Accept variable number of arguments
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3);
sum(10, 20, 30, 40);



/****************************************************************************************
 * FUNCTION OVERLOADING
 ****************************************************************************************/

// Overload signatures
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

// Implementation
function combine(a: any, b: any) {
  return a + b;
}

combine(1, 2);         // number
combine("a", "b");     // string



/****************************************************************************************
 * FUNCTIONS RETURNING OBJECTS
 ****************************************************************************************/

type User = {
  name: string;
  age: number;
};

// Factory function
function createPerson(name: string, age: number): User {
  return { name, age };
}

const person = createPerson("Souvik", 21);



/****************************************************************************************
 * FUNCTIONS WITH PARTIAL / PICK / REQUIRED
 ****************************************************************************************/

type Tea = {
  name: string;
  price: number;
  isHot: boolean;
};

// Partial<T> → update pattern
function updateTea(update: Partial<Tea>) {
  console.log("Updating tea:", update);
}

updateTea({ price: 30 });

// Pick<T, K> → select fields
function getTeaPrice(tea: Pick<Tea, "name" | "price">) {
  console.log(`${tea.name} costs ${tea.price}`);
}

// Required<T> → enforce completeness
function saveTea(tea: Required<Tea>) {
  console.log("Saving tea:", tea);
}



/****************************************************************************************
 * GENERIC FUNCTIONS
 ****************************************************************************************/

// Generic function
function identity<T>(value: T): T {
  return value;
}

identity<number>(10);
identity<string>("hello");

// Generic with constraint
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("chai");
getLength([1, 2, 3]);



/****************************************************************************************
 * FUNCTION AS ARGUMENT (CALLBACK)
 ****************************************************************************************/

function process(value: number, callback: (n: number) => number) {
  return callback(value);
}

process(10, (n) => n * 2);
process(5, (n) => n + 1);



/****************************************************************************************
 * THIS IN FUNCTIONS
 ****************************************************************************************/

const counter = {
  count: 0,
  increment() {
    this.count++;
  },
};

counter.increment();

// Arrow functions DO NOT have their own `this`
const badCounter = {
  count: 0,
  // ❌ `this` does not refer to badCounter
  increment: () => {
    // this.count++; // error / undefined behavior
  },
};



/****************************************************************************************
 * VOID vs NEVER
 ****************************************************************************************/

function logOnly(msg: string): void {
  console.log(msg);
}

// never = function never finishes normally
function throwError(msg: string): never {
  throw new Error(msg);
}



/****************************************************************************************
 * LET vs CONST WITH FUNCTIONS
 ****************************************************************************************/

let fn1 = () => console.log("hello");
fn1 = () => console.log("changed"); // allowed

const fn2 = () => console.log("fixed");
// fn2 = () => console.log("changed"); // ❌ not allowed


