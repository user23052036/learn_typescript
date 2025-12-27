export {};

const names: string[] = ["Alice", "Bob", "Charlie", "Diana"];
const ratings: number[] = [4.5, 3.8, 4.2, 5.0,10, 20];

const numbers: Array<number> = [10, 20, 30, 40, 50];

type Chai = {
    flavour: string;
    price: number;
    premium: boolean;
}

const menu: Chai[] = [
    { flavour: "Masala", price: 30, premium: false },
    { flavour: "Ginger", price: 40, premium: true },
    { flavour: "Cardamom", price: 50, premium: true },  
]

// readonly array
const scores: readonly number[] = [100, 98, 95, 93];

// scores.push(99); // Error: Property 'push' does not exist on type 'readonly number[]'.
// scores[0] = 101; // Error: Index signature in type 'readonly number[]' only permits reading.

//multi-dimensional array
const matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];


// tuple array
const userData: [number, string][] = [
    [1, "Alice"],
    [2, "Bob"],
    [3, "Charlie"],
];

// accessing tuple array elements
userData.forEach(([id, name]) => {
    console.log(`User ID: ${id}, User Name: ${name}`);
});


// single tuple
let userinfo: [string, number, boolean?];
userinfo = ["Diana", 28, true];

// accessing tuple elements
const userId: number = userinfo[1];
const userName: string = userinfo[0];
const isActive: boolean | undefined = userinfo[2];

console.log("User ID:", userId);
console.log("User Name:", userName);
console.log("Is Active:", isActive);


// readonly tuple
let product: readonly [number, string, number];
product = [101, "Laptop", 1500];

// product[0] = 102; // Error: Index signature in type 'readonly [number, string, number]' only permits reading.



// named tuple is preferred for better readability
// this helps in understanding what each element represents and throws suggestion while accessing elements
type Employee = readonly [id: number, name: string, isPermanent: boolean];

let employee: Employee = [1, "Souvik Mandal", true];

// accessing named tuple elements
const empId: number = employee[0];
const empName: string = employee[1];
const empStatus: boolean = employee[2];

console.log("Employee ID:", empId);
console.log("Employee Name:", empName);
console.log("Is Permanent Employee:", empStatus);


// enum array


