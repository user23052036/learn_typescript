
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
