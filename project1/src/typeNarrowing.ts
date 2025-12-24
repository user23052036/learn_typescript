function getCoffee(kind: string | number){

    if(typeof(kind) === "string")
            return "making ${kind} coffee";
    return "coffee order ${kind}";
}

function serveCoffee(msg?: string){

    if(msg) return "serving ${msg}";
    return "serving default coffee";
}

function orderCoffee(size: "small" | "medium" | "large" | number){

    //exhaustive check
    if(size === "small") return "processing a small cup of coffee!";
    if(size === "medium" || size === "large") return "processing a regular coffee...";
    return "coffee order ${size}";
}

class blackCoffee{

    serve(){
        return "serving a black coffee !";
    }
}
class whiteCoffee{

    serve(){
        return "serving a white coffee !";
    }
}

function serve(chai: blackCoffee | whiteCoffee){

    if(chai instanceof(blackCoffee)) return chai.serve();
}
// describing the shape of an abject
type chaiOrder = {
    type: string;
    sugar: number;
}

function isChaiOrder(obj:any): obj is chaiOrder{

    return(typeof(obj) === "object" && obj !== null &&
            typeof(obj.type) === "string" && typeof(obj.sugar) === "number");
}

function serveOrder(item: chaiOrder | string){

    // as it could be any ther object also we are specifically clarifying chaiOrder obj
    if(isChaiOrder(item)) return ("comming up your chai with ${item.sugar}...");
    return "serving customer chai #{item}";
}

type masalaChai = {type: "masala", spicelevel: number};
type adrakChai = {type: "adrak", amount: number};
type elaichiChai = {type: "elichi", aroma: number};

type chai = masalaChai | adrakChai | elaichiChai;

function makeChai(order: chai){
    switch(order.type){
        case "masala":
            return "making masala chai with spicelevel ${order.spicelevel}";
        case "adrak":
            return "making adrak chai with amount ${order.amount}";
        case "elichi":
            return "making elaichi chai with aroma ${order.aroma}";
    }
}


//------------------------------------------------------------------------------------

let value: any;

value = "chai";
value = 10;
value = true;

value.toUpperCase();   // ✅ allowed
value.push(1);         // ✅ allowed
value();               // ✅ allowed
value.toFixed();      // ✅ allowed
// TS does not check anything.


function printLength(val: any) {
    console.log(val.length);
}
// printLength(10); // ❌ runtime error (10 has no length)


//------------------------------------------------------------------------------------

let value1: unknown;

value1 = "chai";
value1 = 10;
value1 = true;

//value1.toUpperCase(); // ❌ ERROR
// “I don’t know what this is.First check its type.”

if (typeof value1 === "string") {
    value1.toUpperCase(); // ✅ now allowed
}

function printLength1(val: unknown) {
    if (typeof val === "string") {
        console.log(val.length); // ✅ safe
    }
}

//------------------------------------------------------------------------------------

// IMPORTANT RULE (TypeScript – exam & interview favorite)
//
// You can assign ANY value to `unknown`
// BUT you cannot assign `unknown` to another type
// unless you FIRST prove (narrow) its type.

// `unknown` can hold anything
let a: unknown = "chai";

// ❌ ERROR: let b: string = a;

// TypeScript does NOT allow assigning `unknown` to `string` directly
// because it is not sure what `a` really is


// ✅ CORRECT WAY: Type narrowing using typeof check
if (typeof a === "string") {
    // Now TypeScript KNOWS that `a` is a string
    // So assigning it to a string variable is safe
    let b: string = a;
}

//------------------------------------------------------------------------------------
