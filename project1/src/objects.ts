export {};
/****************************************************************************************
 * FUNDAMENTAL RULES (READ FIRST)
 *
 * 1. let / const        → create VARIABLES
 * 2. {}                → create OBJECT VALUES
 * 3. type / interface  → create TYPES (compile-time only)
 *
 * VARIABLES ≠ OBJECTS
 * A variable is just a NAME that points to a VALUE.
 * An object is one kind of VALUE.
 *
 * TypeScript has TWO WORLDS:
 * - Type world   → erased after compilation
 * - Value world  → real JavaScript at runtime
 ****************************************************************************************/


/****************************************************************************************
 * COMMAS vs SEMICOLONS
 *
 * TYPE definitions:
 *   - commas (,) and semicolons (;) are interchangeable
 *
 * OBJECT values:
 *   - ONLY commas are allowed
 *
 * Style convention:
 *   - multi-line types  → semicolons
 *   - object literals   → commas
 ****************************************************************************************/


/****************************************************************************************
 * 1. OBJECT LITERAL (MOST COMMON)
 ****************************************************************************************/

// Inline TYPE + object literal
const objLiteral: { name: string; age: number } = {
  name: "Alice",
  age: 30,
};

// const prevents REASSIGNMENT of the variable
// but DOES NOT make the object immutable
objLiteral.name = "Updated"; // ✅ allowed
// objLiteral = {}           // ❌ not allowed



/****************************************************************************************
 * 2. TYPE ALIAS (SHAPE DEFINITION)
 ****************************************************************************************/

type Tea = {
  name: string;
  price: number;
  isHot: boolean;
};

// Tea is NOT a variable
// Tea is NOT an object
// Tea exists ONLY for TypeScript checks

const tea: Tea = {
  name: "Adrak Chai",
  price: 25,
  isHot: true,
};

// tea → variable
// { ... } → object
// Tea → compile-time checker only



/****************************************************************************************
 * 3. STRUCTURAL TYPING (VERY IMPORTANT)
 *
 * Rule:
 *   "If it has the required properties, it is compatible"
 ****************************************************************************************/

type Cup = { size: string };

let smallCup: Cup = { size: "200ml" };

let bigCup = {
  size: "500ml",
  material: "steel",
};

// Extra properties are allowed
smallCup = bigCup; // ✅ OK

// Reverse is NOT allowed
// bigCup = smallCup; // ❌ ERROR (material missing)



/****************************************************************************************
 * 4. OPTIONAL PROPERTIES
 ****************************************************************************************/

type OptionalTea = {
  name: string;
  price?: number; // optional
};

const t1: OptionalTea = { name: "Black Tea" };
const t2: OptionalTea = { name: "Green Tea", price: 20 };



/****************************************************************************************
 * 5. PARTIAL<T> — UPDATE PATTERN
 ****************************************************************************************/

// Partial<T> makes ALL properties optional
// Partial<Tea> becomes:
// {
//   name?: string;
//   price?: number;
//   isHot?: boolean;
// }

const updateChai = (updates: Partial<Tea>) => {
  console.log("Updating chai with:", updates);
};

updateChai({ price: 30 });
updateChai({ isHot: false });
updateChai({ name: "Masala", price: 40 });



/****************************************************************************************
 * 6. REQUIRED<T> — FORCE ALL PROPERTIES
 ****************************************************************************************/

// Required<T> makes ALL properties REQUIRED
// even if they were optional in the original type
//
// Example:
//
// type Tea = {
//   name: string;
//   price?: number;
//   isHot?: boolean;
// }
//
// Required<Tea> becomes:
// {
//   name: string;
//   price: number;
//   isHot: boolean;
// }

const createFullTea = (tea: Required<Tea>) => {
  console.log("Creating full tea:", tea);
};

// ❌ Error: missing properties
// createFullTea({ name: "Black Tea" });

// ✅ Valid
createFullTea({
  name: "Black Tea",
  price: 20,
  isHot: true,
});



/****************************************************************************************
 * 7. PICK<T, K> — SELECT SPECIFIC PROPERTIES
 ****************************************************************************************/

// Pick<T, K> creates a new type
// by SELECTING only certain properties from T
//
// Pick<Tea, "name" | "price"> becomes:
// {
//   name: string;
//   price: number;
// }

const getTeaSummary = (tea: Pick<Tea, "name" | "price">) => {
  console.log(`Tea: ${tea.name}, Price: ${tea.price}`);
};

// ✅ Only selected properties required
getTeaSummary({
  name: "Adrak Chai",
  price: 25,
});

// ❌ Error: extra property not allowed
// getTeaSummary({
//   name: "Adrak Chai",
//   price: 25,
//   isHot: true,
// });


/****************************************************************************************
 * 8. OBJECT.CREATE() — PROTOTYPE DELEGATION
 ****************************************************************************************/

const proto = {
    name: "Default",
  greet() {
    // `this` refers to the CALLER, not proto itself
    console.log(`Hello, my name is ${this.name}`);
  },
};

// Creates a new object whose prototype is `proto`
const objCreate = Object.create(proto);

// Property exists on objCreate, not proto
objCreate.name = "Souvik";

// Method lookup path:
// objCreate → proto → Object.prototype
objCreate.greet();


/****************************************************************************************
 * 9. CLASS (SYNTAX SUGAR OVER PROTOTYPES)
 ****************************************************************************************/

class Animal {

  constructor(public species: string, public sound: string) 
    {
        this.species = species;
        this.sound = sound;
    }

  makeSound() {
    console.log(`${this.species} says ${this.sound}`);
  }
}

const dog = new Animal("Dog", "Woof");
dog.makeSound();



/****************************************************************************************
 * 10. FACTORY FUNCTION (NO `new`)
 ****************************************************************************************/

function createCar(company: string, model: string) {
  return {company, model, drive() {
      console.log(`Driving a ${this.company} ${this.model}`);
    },};
}

const car = createCar("Toyota", "Corolla"); 
car.drive();// here car is an object we we can call the drive() function



/****************************************************************************************
 * 11. let vs const (VARIABLE BEHAVIOR)
 ****************************************************************************************/

let x = { value: 10 };
x = { value: 20 }; // ✅ allowed

const y = { value: 10 };
y.value = 20;      // ✅ allowed
// y = { value: 30 }; // ❌ not allowed



/*******************************************************************************************
 * 12. mislenious
 * *****************************************************************************************/
type Item = {name: string; quantity: number;};
type Address = {street: string; city: string;};

type order = {
    id: string;
    item: Item[];
    address: Address;
};