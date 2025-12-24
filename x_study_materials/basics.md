
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
