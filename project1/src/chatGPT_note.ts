/**********************************************************************
 * 🔥 TYPESCRIPT COMPLETE NOTES
 * From ZERO → ADVANCED
 * Copy & Paste Friendly (VS Code)
 *********************************************************************/

/*====================================================================
  0️⃣ JavaScript vs TypeScript
====================================================================*/
/*
JavaScript:
- Dynamic typing
- Errors at runtime

TypeScript:
- Static typing
- Errors at compile time
- Compiles to JavaScript
*/


/*====================================================================
  1️⃣ let, const, var  (VERY IMPORTANT)
====================================================================*/

// var → function scoped (AVOID)
var a = 10;
var a = 20; // redeclaration allowed ❌

// let → block scoped
let b = 10;
// let b = 20 ❌ redeclaration not allowed
b = 20; // reassignment allowed

// const → block scoped + no reassignment
const c = 30;
// c = 40 ❌ not allowed

// const objects CAN mutate
const userConst = { name: "Souvik" };
userConst.name = "Mandal"; // ✅ allowed


/*====================================================================
  2️⃣ Basic Types
====================================================================*/

let username: string = "Souvik";
let age: number = 21;
let isStudent: boolean = true;


/*====================================================================
  3️⃣ Type Inference
====================================================================*/

let city = "Kolkata"; // inferred as string
// city = 123 ❌ error


/*====================================================================
  4️⃣ Any (TURN OFF TYPE SAFETY)
====================================================================*/

let randomValue: any = 10;
randomValue = "chai";
randomValue = true;


/*====================================================================
  5️⃣ Unknown (SAFE alternative to any)
====================================================================*/

let inputValue: unknown = "chai";

// ❌ let s: string = inputValue;

if (typeof inputValue === "string") {
  let s: string = inputValue; // ✅ safe
}


/*====================================================================
  6️⃣ Never
====================================================================*/

function crash(msg: string): never {
  throw new Error(msg);
}


/*====================================================================
  7️⃣ Void
====================================================================*/

function log(msg: string): void {
  console.log(msg);
}


/*====================================================================
  8️⃣ Null & Undefined
====================================================================*/

let u: undefined = undefined;
let n: null = null;


/*====================================================================
  9️⃣ Arrays
====================================================================*/

let nums: number[] = [1, 2, 3];
let names: Array<string> = ["A", "B"];


/*====================================================================
  🔟 Tuples
====================================================================*/

let userTuple: [string, number] = ["Souvik", 21];


/*====================================================================
  1️⃣1️⃣ Enums
====================================================================*/

enum Status {
  Pending,
  Success,
  Error
}

let currentStatus: Status = Status.Pending;


/*====================================================================
  1️⃣2️⃣ Union Types
====================================================================*/

let id: number | string;
id = 101;
id = "A101";


/*====================================================================
  1️⃣3️⃣ Literal Types
====================================================================*/

let requestState: "pending" | "success" | "error";
requestState = "pending";


/*====================================================================
  1️⃣4️⃣ Type Aliases
====================================================================*/

type User = {
  name: string;
  age: number;
  isAdmin: boolean;
};

let u1: User = {
  name: "Souvik",
  age: 21,
  isAdmin: false
};


/*====================================================================
  1️⃣5️⃣ Interfaces
====================================================================*/

interface Product {
  id: number;
  title: string;
  price?: number; // optional
}


/*====================================================================
  1️⃣6️⃣ Type vs Interface
====================================================================*/
/*
interface:
- preferred for objects
- supports declaration merging

type:
- supports union, primitive aliases
*/


/*====================================================================
  1️⃣7️⃣ Functions
====================================================================*/

function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;


/*====================================================================
  1️⃣8️⃣ Optional & Default Parameters
====================================================================*/

function greet(name: string = "Guest"): string {
  return `Hello ${name}`;
}


/*====================================================================
  1️⃣9️⃣ Rest Parameters
====================================================================*/

function sumAll(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}


/*====================================================================
  2️⃣0️⃣ Function Overloads
====================================================================*/

function getData(id: number): string;
function getData(id: string): string;

function getData(id: number | string): string {
  return `Data for ${id}`;
}


/*====================================================================
  2️⃣1️⃣ Objects
====================================================================*/

let order: { id: number; price: number } = {
  id: 1,
  price: 299
};


/*====================================================================
  2️⃣2️⃣ Readonly
====================================================================*/

type Account = {
  readonly id: number;
  balance: number;
};


/*====================================================================
  2️⃣3️⃣ Index Signatures
====================================================================*/

type StringMap = {
  [key: string]: string;
};


/*====================================================================
  2️⃣4️⃣ keyof & typeof
====================================================================*/

type UserKeys = keyof User;

const config = { port: 3000, secure: true };
type ConfigType = typeof config;


/*====================================================================
  2️⃣5️⃣ Type Assertion
====================================================================*/

let value2: unknown = "TypeScript";
let len = (value2 as string).length;


/*====================================================================
  2️⃣6️⃣ Classes
====================================================================*/

class Person {
  constructor(public name: string, public age: number) {}

  greet(): string {
    return `Hi ${this.name}`;
  }
}


/*====================================================================
  2️⃣7️⃣ Access Modifiers
====================================================================*/

class Bank {
  public name: string;
  private balance: number;
  protected branch: string;

  constructor(name: string, balance: number, branch: string) {
    this.name = name;
    this.balance = balance;
    this.branch = branch;
  }
}


/*====================================================================
  2️⃣8️⃣ Inheritance
====================================================================*/

class Employee extends Person {
  constructor(name: string, age: number, public salary: number) {
    super(name, age);
  }
}


/*====================================================================
  2️⃣9️⃣ Abstract Classes
====================================================================*/

abstract class Shape {
  abstract area(): number;
}


/*====================================================================
  3️⃣0️⃣ Interfaces with Classes
====================================================================*/

interface Flyable {
  fly(): void;
}

class Bird implements Flyable {
  fly() {
    console.log("Flying");
  }
}


/*====================================================================
  3️⃣1️⃣ Generics
====================================================================*/

function identity<T>(value: T): T {
  return value;
}


/*====================================================================
  3️⃣2️⃣ Generic Constraints
====================================================================*/

function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}


/*====================================================================
  3️⃣3️⃣ Utility Types
====================================================================*/

type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type PickUser = Pick<User, "name">;
type OmitUser = Omit<User, "isAdmin">;


/*====================================================================
  3️⃣4️⃣ Type Guards
====================================================================*/

function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  }
}


/*====================================================================
  3️⃣5️⃣ Discriminated Unions
====================================================================*/

type ShapeX =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };


/*====================================================================
  3️⃣6️⃣ Optional Chaining
====================================================================*/

let userOpt: { name?: string } = {};
console.log(userOpt.name?.toUpperCase());


/*====================================================================
  3️⃣7️⃣ Nullish Coalescing
====================================================================*/

let input = null;
let output = input ?? "default";


/*====================================================================
  3️⃣8️⃣ Async / Await Typing
====================================================================*/

async function fetchData(): Promise<string> {
  return "data";
}


/*====================================================================
  3️⃣9️⃣ Modules
====================================================================*/

// export
export const PI = 3.14;

// import
// import { PI } from "./math";


/*====================================================================
  4️⃣0️⃣ tsconfig.json (CORE OPTIONS)
====================================================================*/
/*
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "noImplicitAny": true,
    "outDir": "dist",
    "rootDir": "src"
  }
}
*/