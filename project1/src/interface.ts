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
