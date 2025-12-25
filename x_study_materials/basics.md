
## `./src` ✅ (correct & safe)

* **Relative path**
* Resolved **from the location of `tsconfig.json`**
* Always predictable

```json
"rootDir": "./src"
```

Means:

> “Use the `src` folder **inside this project**”

This is what you should use **99% of the time**.

---

## `/src` ⚠️ (why it *seems* to work sometimes)

* **Absolute path**
* Resolved from the **filesystem root**

```json
"rootDir": "/src"
```

Means:

> “Use `/src` at the root of my OS”

---

You’re actually very close. Two separate issues here — **running a specific TS file** and **why `dist/` isn’t ignored**. I’ll keep it tight.

---

## 1️⃣ How to run a **specific** TypeScript file

### ✅ Rule of thumb

* **You never run `.ts` directly with Node**
* You run the **compiled `.js`** from `dist/`

---

### **Option A (your current setup – recommended)**

Compile → run the generated JS

#### Compile only one file

From inside `project1`:

```bash
tsc src/union_and_any.ts
```

This generates:

```text
dist/union_and_any.js
```

Run it:

```bash
node dist/union_and_any.js
```

---

### **Option B (compile everything, then run what you want)**

```bash
tsc
node dist/index.js
node dist/union_and_any.js
```

This is **how TS is used in real projects**.

---

### **Option C (fast learning mode – optional)**

If you don’t want `dist/` while learning:

```bash
npx ts-node src/union_and_any.ts
```

⚠️ Not used in production, but great for practice.

---

## 2️⃣ Why `dist/` is NOT getting ignored by Git

This is a **classic Git gotcha**.

### 🔴 Reason

Git **does not ignore files that are already tracked**, even if you add them to `.gitignore`.

So `dist/` was committed **before** you added `.gitignore`.

---

### ✅ Fix (do this once)

From **root folder**:

```bash
git rm -r --cached project1/dist
git rm -r --cached project2/dist
git rm -r --cached project3/dist
```

Then commit:

```bash
git commit -m "Remove dist folders from tracking"
```

---

### ✅ Correct `.gitignore` (root)

```gitignore
# Ignore all dist folders
**/dist/

# Node stuff
node_modules/
```

After this:

* `dist/` will stay on your machine
* Git will **never track it again**

---

## 3️⃣ Small improvement (recommended structure)

Inside each project:

```text
project1/
 ├── src/
 ├── dist/
 ├── tsconfig.json
 └── package.json
```

Then:

```bash
cd project1
tsc
node dist/index.js
```

This avoids **cross-project TS confusion** later.

---

### ✅ One-line summary

* Compile TS → run JS from `dist/`
* Git won’t ignore files already tracked
* Use `git rm --cached` once to fix it

---

Perfect — here’s the **decision rule** you can lock in and never overthink again.

---

## When to create a `package.json`

### ✅ **Create `package.json` (YES) if ANY of these are true**

* You use **npm libraries** (`express`, `axios`, `zod`, etc.)
* You want **scripts** (`npm run build`, `npm start`)
* You want **TypeScript config per project**
* You want **clean, reusable, real-world project structure**
* You plan to **share / deploy / Dockerize** the project

👉 This is **90% of real projects**.

---

### ❌ **Do NOT create `package.json` (NO) if ALL are true**

* Pure learning / syntax practice
* Single `.ts` files
* No external libraries
* You’re just running `tsc` manually

👉 This is your **early learning phase**.

---

## 🔥 Your exact case (honest answer)

You are:

* Learning TS seriously
* Writing multiple files
* Using `tsconfig`
* Planning real projects later

### ✅ Verdict:

**Create `package.json` per project**

Not now for everything — **only when a project grows**.

---

## Recommended hybrid setup (best for you)

```text
LEARN_TYPESCRIPT/
 ├── project1/        ← learning-only (NO package.json)
 │    └── src/*.ts
 │
 ├── project2/        ← learning-only (NO package.json)
 │
 ├── project3/        ← REAL project (YES package.json)
 │    ├── src/
 │    ├── dist/
 │    ├── tsconfig.json
 │    └── package.json
 │
 └── x_study_materials/
```

---

## Minimal `package.json` when you DO create one

```json
{
  "name": "project3",
  "private": true,
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

Run:

```bash
npm run build
npm start
```

---

## 🚫 What beginners often do wrong (avoid this)

* Creating `package.json` for **every tiny file**
* Installing dependencies globally
* Mixing multiple projects under one `package.json`

You’re avoiding all of that — good instincts.

---

No worries — this is **pure JavaScript**, not TypeScript. Let’s lock it in **once and for all**.

---

## 1️⃣ Normal string (plain string)

Written with **single `'`** or **double `"`** quotes.

```js
"Hello"
'Hello'
```

### ❌ No variable substitution happens

```js
const name = "Souvik";

console.log("Hello ${name}");
```

🧠 Output:

```
Hello ${name}
```

Because JavaScript treats it as **normal text**.

---

## 2️⃣ Template string (template literal)

Written with **backticks** ( ` ` )

```js
`Hello`
```

### ✅ Variables ARE substituted

```js
const name = "Souvik";

console.log(`Hello ${name}`);
```

🧠 Output:

```
Hello Souvik
```

---

## 3️⃣ Why `${}` only works in template strings

`${}` is **NOT special by itself**.
It only has meaning **inside backticks**.

```js
`Value is ${10 + 5}`   // ✅ works
"Value is ${10 + 5}"  // ❌ literal text
```

---

## 4️⃣ Side-by-side (see the difference)

```js
const role = "admin";

// Normal string
console.log("Role is ${role}");

// Template string
console.log(`Role is ${role}`);
```

Output:

```
Role is ${role}
Role is admin
```

---

## 5️⃣ Why your code broke

You wrote:

```ts
throw new Error("Unhandled role: ${exhaustiveCheck}");
```

That is a **normal string**.

So the error message becomes literally:

```
Unhandled role: ${exhaustiveCheck}
```

---

## 6️⃣ Correct version

```ts
throw new Error(`Unhandled role: ${exhaustiveCheck}`);
```

Now it actually inserts the value.

---

## 7️⃣ Bonus: template strings are MORE powerful

### Multi-line strings (no `\n` needed)

```js
const msg = `
Line 1
Line 2
Line 3
`;

console.log(msg);
```

---

### Expressions inside `${}`

```js
const a = 10;
const b = 20;

console.log(`Sum = ${a + b}`);
```

---

## 8️⃣ When to use what (simple rule)

| Use case              | String type    |
| --------------------- | -------------- |
| Static text           | `" "` or `' '` |
| Variables inside text | `` ` ` ``      |
| Multi-line text       | `` ` ` ``      |

---

## 🔑 One-line rule (memorize)

> **`${}` only works inside backticks — never inside quotes.**

That’s it.
If you want, next I can give:

* A **1-minute JS string cheat sheet**
* Common mistakes people make in interviews
* Why backticks exist at all

Just tell me 👍

---

This is a **very deep and very correct question** — and you’re thinking about TypeScript *the right way*, especially coming from **Java**.
Let me answer this **carefully**, not with slogans.

---

# Why Java interfaces exist vs why TS types/interfaces exist

You’re noticing something real:

> **Java interfaces exist at runtime.
> TypeScript interfaces do NOT.**

So the question becomes:

> **If TS interfaces vanish, what’s the point?**

Let’s answer that by contrasting **Java’s world** vs **JavaScript’s world**.

---

## 1️⃣ Java was designed around classes

In Java:

* Everything is a class
* Objects **must** be created from classes
* Interfaces enforce **runtime contracts**
* The JVM checks correctness

```java
interface Chai {
    int sugar();
}

class Tea implements Chai {
    public int sugar() { return 2; }
}
```

At runtime:

* JVM knows `Chai`
* Reflection works
* Interface dispatch exists

👉 Java interfaces exist because **Java has no objects without classes**.

---

## 2️⃣ JavaScript was NEVER class-first

In JavaScript:

```js
const chai = {
    sugar: 2
};
```

No class.
No interface.
Still valid.

JS is:

* Prototype-based
* Object-literal-first
* Dynamic

Classes were added **later** as syntax sugar.

---

## 3️⃣ TypeScript’s real mission (THIS is the key)

> **TypeScript does NOT try to replace Java.
> It tries to make JavaScript safer.**

JS allows this (no error):

```js
makeChai({ sugar: "a lot" });
```

TypeScript exists to **catch this BEFORE runtime**.

---

## 4️⃣ So why TS types/interfaces vanish?

Because:

> **JavaScript runtime does not understand types.**

TypeScript cannot change JS runtime behavior.
So it adds **compile-time guarantees only**.

This is a *design choice*, not a limitation.

---

## 5️⃣ Then what value do TS types/interfaces give?

### 🔥 They give **EARLY FAILURE**

```ts
function makeChai(order: Chai) {}
```

If someone passes:

```ts
makeChai({ sugar: "two" });
```

❌ Compile-time error
✅ No runtime crash
✅ Faster feedback

---

## 6️⃣ Why not just use classes everywhere?

Good thought — but here’s why that’s bad 👇

---

### ❌ Problem 1: Classes force object creation

```ts
new Tea("Masala", 2, true, false);
```

But JS often gets data from:

* APIs
* JSON
* DBs
* Forms

Those are **plain objects**, not class instances.

```ts
fetch(...).then(data => {
    // data is plain object
});
```

You **cannot enforce class creation** here.

---

### ❌ Problem 2: Classes are runtime-heavy

* Constructors
* Prototypes
* Memory
* Inheritance chains

Types/interfaces are **zero-cost**.

---

### ❌ Problem 3: Classes cannot express unions

```ts
type Role = "admin" | "user" | "guest";
```

No class equivalent.
This is a **massive power** TS gives.

---

## 7️⃣ The killer reason: structural typing

Java:

```java
class Tea implements Chai {}
```

TS:

```ts
function makeChai(order: Chai) {}
```

Any object with correct shape works:

```ts
makeChai({
    type: "Masala",
    sugar: 2,
    milk: true,
    strong: false
});
```

🔥 No class required
🔥 No inheritance
🔥 Much more flexible

---

## 8️⃣ Think of TS interfaces as “compile-time contracts”

Even though they vanish, they:

* Protect you while coding
* Guide autocomplete
* Prevent bugs
* Act as documentation
* Scale large codebases

This is **huge** in JS ecosystems.

---

## 9️⃣ When SHOULD you use classes in TS?

Use classes when you need:

* Behavior + state
* Methods
* Lifecycle
* Encapsulation

```ts
class Tea {
    boil() {}
    serve() {}
}
```

Not for simple data shapes.

---

## 🔑 The big mental shift from Java → TS

> **Java enforces correctness at runtime.
> TypeScript enforces correctness before runtime.**

Different philosophy.

---

## 10️⃣ Final truth (this matters)

> TypeScript types/interfaces exist **for humans and compilers**, not for JavaScript.

That’s why they vanish — their job is already done.

---

## 11️⃣ Practical rule (write this down)

```txt
API data / config / DTO → type or interface
Business logic / behavior → class
Validation → runtime (zod, joi, etc.)
```

---

## 12️⃣ One-line answer to your doubt

> In TypeScript, we don’t use types/interfaces to create objects — we use them to **prevent invalid objects from ever existing in our code**.


---