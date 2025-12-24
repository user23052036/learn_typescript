let subs: number | string = "1M";

let apiRrquestStatus: "pending" | "success" | "error" = "pending";


// `currentOrder` might never be assigned if "76" is not found.
// TypeScript warns to prevent use of an uninitialized variable.
//
// Ways to avoid this:
// 1. Initialize with `undefined` and use a union type (string | undefined)
// 2. Assign a default fallback value (e.g., "NOT_FOUND")
// 3. Check for `undefined` before using the variable
// 4. Use Array.prototype.find() which safely returns `string | undefined`

const orders: String[] = ["21","45","76", "98"];
let currentOrder: String | undefined;

for(let order of orders){
    if(order === "76"){
        currentOrder = order;
        break;
    }
}
if(currentOrder != undefined)
    console.log(currentOrder);