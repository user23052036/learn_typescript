export {}; // makes file a module


/* =========================================================
   1️⃣ USING `type` (shape only, no class intention)
   ========================================================= */

// `type` defines a SHAPE (compile-time only)
type ChaiType = {
    type: string;
    sugar: number;
    milk: boolean;
    strong: boolean;
};

// Normal function using the type
function makeChai(order: ChaiType) {
    console.log(`Type: ${order.type}`);
    console.log(`Sugar: ${order.sugar}`);
    console.log(`Milk: ${order.milk}`);
    console.log(`Strong: ${order.strong}`);
}

// Plain object that MATCHES the shape
const chai1: ChaiType = {
    type: "Masala",
    sugar: 2,
    milk: true,
    strong: false
};

makeChai(chai1);

// Works because TypeScript uses STRUCTURAL typing
// No class, no implements involved

/* =========================================================
   2️⃣ USING `interface` (intended for classes & contracts)
   ========================================================= */

// `interface` defines a CONTRACT for objects/classes
interface ChaiInterface {
    type: string;
    sugar: number;
    milk: boolean;
    strong: boolean;
}

// Class IMPLEMENTS an interface
class Tea implements ChaiInterface {
    // All properties MUST be present
    type: string;
    sugar: number;
    milk: boolean;
    strong: boolean;
// this = the new object being created
    constructor(type: string,sugar: number,milk: boolean,strong: boolean) {
        this.type = type;
        this.sugar = sugar;
        this.milk = milk;
        this.strong = strong;
    }
}

const chai2 = new Tea("Ginger", 1, true, true);

makeChai(chai2);

// `implements` is DESIGNED for interfaces
//  Compiler enforces the contract



/* =========================================================
   3️⃣ CLASS "implements" A TYPE (allowed, but not ideal)
   ========================================================= */

// Type again
type ChaiType2 = {
    type: string;
    sugar: number;
    milk: boolean;
    strong: boolean;
};

// This is ALLOWED 👇
class Tea2 implements ChaiType2 {
    type = "Elaichi";
    sugar = 2;
    milk = true;
    strong = false;
}

// This works because TS only checks STRUCTURE
// But semantically, `type` is NOT meant for class contracts


/* =========================================================
   4️⃣ WHY INTERFACE IS BETTER FOR CLASSES
   ========================================================= */

// Interface can be EXTENDED
interface HotDrink {
    temperature: "hot";
}

interface ChaiFinal extends ChaiInterface, HotDrink {
    brand?: string; // optional property
}

class Tea3 implements ChaiFinal {
    type = "Masala";
    sugar = 2;
    milk = true;
    strong = false;
    temperature: "hot" = "hot";
    brand = "Local";
}

// Clean
// Scalable
// Industry standard


/* =========================================================
   5️⃣ FINAL RULES (MEMORIZE)
   ========================================================= */

/*
1. `type`
   - Best for unions, primitives, utility types
   - Not designed for class contracts
   - type is removed when TS → JS.
   - No memory footprint
   - No js runtime impact
   - Only helps the compiler
   - Think of it as: Compiler notes

2. `interface`
   - Best for object shapes
   - Best for classes + implements
   - Supports extension & declaration merging
   - No memory footprint
   - No js runtime impact
   - Only helps the compiler
   - Think of it as: Blueprint for classes

3. Classes
   - `implements interface` ✅ recommended
   - `implements type` ⚠️ allowed but avoid
   - This exists in JavaScript.
   - Has runtime presence
   - can be instantiated
   - Think of it as: Actual object blueprint

*/

type response1 = { 
    ok: true | false 
}; // ONE object shape, with a flexible value.

type response2 = {ok: true} | {ok: false};// TWO distinct object shapes.

class myRes1 implements response1 {
    ok: boolean = true;
}

// class myRes2 implements response2 {
//     ok: boolean = true;
// }
//Classes cannot implement union types because a union represents multiple possible shapes, not one guaranteed shape.
// Thus, the compiler cannot ensure that the class adheres to all possible structures defined by the union.


//----------------------------------------------------------------------------------------------------------
// intersection types with classes

type A = {a: string};
type B = {b: number};
type C = A & B; // intersection type

class myClass implements C {
    a: string = "hello";
    b: number = 42;
}

// An intersection type like C requires the implementing class to have all properties from both A and B.
// Therefore, myClass must define both a and b properties to satisfy the contract of type C.

//----------------------------------------------------------------------------------------------------------
// optional properties in interfaces vs types

interface InterfaceWithOptional {
    prop1: string;
    prop2?: number; // optional
}

type TypeWithOptional = {
    prop1: string;
    prop2?: number; // optional
};

class ClassWithInterface implements InterfaceWithOptional {
    prop1: string = "test";
    // prop2 is optional, so it can be omitted
}

class ClassWithType implements TypeWithOptional {
    prop1: string = "test";
    // prop2 is optional, so it can be omitted
}

const u1: TypeWithOptional = { prop1: "hello" };
const u2: InterfaceWithOptional = { prop1: "hello" };

// Both interfaces and types handle optional properties similarly when implemented in classes.
// The implementing class can choose to include or omit the optional property without any issues.

//----------------------------------------------------------------------------------------------------------
// readonly properties in interfaces vs types

interface InterfaceWithReadonly {
    readonly id: number;
    name: string;
}

type TypeWithReadonly = {
    readonly id: number;
    name: string;
};

const cfg: TypeWithReadonly = { id: 1, name: "config" };
// for the first time value can be assigned
// cfg.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.

const cfg2: InterfaceWithReadonly = { id: 1, name: "config" };
// for the first time value can be assigned
// cfg2.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.

// Both interfaces and types enforce readonly properties similarly.
// Attempting to modify a readonly property results in a compile-time error.

//----------------------------------------------------------------------------------------------------------