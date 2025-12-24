let age: number = 20;

if(age < 50){
    console.log("too young!");
    age += 10;
}
console.log("age: ",age);

let num1: number = 10;
let num2 = 101_283_455;
let str: string = "Souvik";
let bool: boolean = true;

let level;  // any type if not innitialized
level = 12.1233;
level = "sssSd";

let random = [1,44.5,"sonu",true,'T'];
let numbers: number[] = [1,4,55,3,6,2,2,66];
let empty = [];    // empty array by default type any

function render(document: any): string{
    let name: string = "Souvik"
    console.log(document);
    return "hello ${name}"
}