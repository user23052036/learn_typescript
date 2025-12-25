//forcefull type assertion

let response: any = "42";
let numericLength: number = (response as string).length;  // unsafe if response is not a string

/*
Book is NOT a real object, It does not exist in memory, It is just a type definition
It is used to define the shape of an object. 
Blueprint / contract
*/
type Book = {
    title: string;
    author: string;
    pages: number;
}

// “This function returns a boolean, and when it returns true, obj should be considered a Book.”
// Type Guard function. 
function isBook(obj: any): obj is Book {
    return (
        typeof obj === "object" &&
        typeof obj.title === "string" &&
        typeof obj.author === "string" &&
        typeof obj.pages === "number"
    );
}

let bookString = '{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","pages":180}'; // follows JSON format
typeof(bookString); // string

const parsed: unknown = JSON.parse(bookString);
// Converts string → JavaScript value, Output is a plain JS object
if (isBook(parsed)) {
    const bookObject: Book = parsed;
    console.log(bookObject.title);
} else console.error("Invalid Book JSON");


//-----------------------------------------------------------------------

const wrong = '{"title":"Only title"}';
const book = JSON.parse(wrong) as Book;

console.log(book.pages); // ❌ undefined at runtime
// To avoid such issues, it's better to validate the structure of the parsed object before using it.

//-----------------------------------------------------------------------

const inputElement = document.getElementById("username") as HTMLInputElement;
// Now TypeScript knows inputElement is an HTMLInputElement
console.log(inputElement.value); // Accessing the value property safely

try{

} catch(error){
    if(error instanceof Error)
        console.log(error.message);
    else console.log(String(error));
}


//------------------------------------------------------------------------------------

type Role = "admin" | "user" | "guest";

// void as return type means we dont care about the return value
function redirectUser(role: Role): void {
    switch (role) {
        case "admin":
            console.log("Redirecting to admin dashboard");
            break;
        case "user":
            console.log("Redirecting to user homepage");
            break;
        case "guest":
            console.log("Redirecting to guest welcome page");
            break;
        default:
            const exhaustiveCheck: never = role;
            throw new Error(`Unhandled role: ${exhaustiveCheck}`);
    }
}

// a function returning never, never reaches its end point
function neverRuturn(): never {
    while(true){}
}


