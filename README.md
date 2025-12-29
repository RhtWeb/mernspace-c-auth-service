### Test-Driven Development (TDD)

- **Quality Assurance**
- **Documentation**
- **Flexibility**
- **Confidence**

---

##### Rinse and Repeat 🔄

TDD is cyclic. You’ll:

1. Write a test.
2. Implement code.
3. Refactor if needed.
4. Go back to writing the next test.

✅ Global Test Setup `tests/setup.ts` runs once per test suite
✅ Feature setup is controlled per folder by **imported manually** inside tests

---

### 🧠 1️⃣0️⃣ Mental Model (Very Important)

Think of tests like this:

> **Arrange** → **Act** → **Assert**

---

#### You SHOULD use:

✅ **Class-based controllers**  
✅ **Manual Dependency Injection**  
❌ **Avoid Singletons**
✅ Arrow Function Class Fields (BEST PRACTICE - Capture `this` lexically)
This is the **cleanest, safest, most scalable** approach.

---

##### Testing handbook

###### During TDD:

1. **Write a tiny E2E test first**.
2. **Drive development with integration tests**.
3. **Add unit tests only when logic becomes complex**.

## This is how **real backend teams** do TDD — not blog-post TDD.

###### 2️⃣ High-Level Difference (Golden Rule)

| Test Type   | Scope                   | DB           | Speed     | Purpose             |
| ----------- | ----------------------- | ------------ | --------- | ------------------- |
| Unit        | Single class / function | ❌ Mock      | ⚡ Fast   | Logic correctness   |
| Integration | Multiple layers         | ✅ Real/Test | 🐢 Medium | Layer interaction   |
| E2E         | Full system             | ✅ Real      | 🐌 Slow   | Business confidence |

---

###### ✅ Correct Layered Design (Target)

```
Route
  → Controller
      → Service
          → Repository
              → DB
```

---

Auto test setting up
Vitest

Testing and assertion library
AAA -> Arrange , Act, Assert SuperTest
Testing HTTP request
It will fake an HTTP request
It uses Express Under the hood
It creates an isolated env for testing

```bash
pnpm add -D vitest supertest @types/supertest
pnpm add -D @vitest/coverage-v8
mkdir test
cd test
touch health.test.ts
```

---

---

## Repo starter template SetUP

- install nodejs, pnpm, git, bash terminal, typescript, nvm
- < > Code button > copy the URL > Open your terminal

###### If this repo is a starter template:

```bash
git --version #Check if Git is already installed
git clone https://github.com/your-org/mernspace-c-auth-service.git express-auth-service #This creates a new folder with the repo name
cd express-auth-service #Move into the project directory
rm -rf .git
git init
```

`This gives you a clean Git history for each microservice.`

###### Run the setUp

```bash
nvm use
pnpm install # Install dependencies
cp .env.example .env # Edit .env as needed
pnpm run dev # Check package.json
```

---
