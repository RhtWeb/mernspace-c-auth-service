### Checklist for the express project initial setup

- [ ] Git SetUp.
- [ ] NVM SetUp.
- [ ] Node Js Project SetUp
- [ ] TypeScript SetUp
- [ ] Prettier SetUp
- [ ] Eslint SetUp
- [ ] Git hooks SetUp
- [ ] App ENV config SetUp
- [ ] ExpressJs app SetUp
- [ ] Logger setup
- [ ] Error handling setup
- [ ] Tests SetUp
- [ ] Create Template

---

## Repo starter template SetUP

- install nodejs, pnpm, git, bash terminal, typescript, nvm
- < > Code button > copy the URL > Open your terminal

###### If this repo is a starter template:

```bash
git --version #Check if Git is already installed
git clone https://github.com/your-org/express-ts-starter.git my-new-service #This creates a new folder with the repo name
cd my-new-service #Move into the project directory
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

---

#### Git SetUp

```bash
rm -rf .git
git --version
git init
touch .gitignore
ls -la
git status
git add .  # untrack to stage file (all file)
git commit -m "add .gitignore" # verb + file || files commited to local repo
# create a remote repo in github
git remote add origin git@github.com:<username>/<reponame>.git #[ssh | http]
git branch -M main
git push -u origin main # [we add upstream so that we dont have to add remote again]
git remote -v
git checkout -b <branch>
```

---

#### NVM SetUp

`To switch between node version with help of nvm`

```bash
nvm -v #[OR install nvm]
touch .nvmrc
echo v24.12.0 > .nvmrc
nvm ls
nvm install
nvm use
nvm alias default v24.12.0
```

---

#### Node Js Project SetUp

we are going to use pnpm

```bash
npx pnpm@latest-10 dlx @pnpm/exe@latest-10 #setup [inside powershell as admin]

#[OR]
npm install -g pnpm@latest-10
pnpm self-update
```

```bash
mkdir src
cd src
touch server.js
echo console.log("hello from server") > server.js
node src/server.js
pnpm init    #[Create a `package.json` file. metadata of the project]
```

"scripts": {
"dev": "node src/server.js"
},

```bash
pnpm dev
pnpm add <package name>
```

---

#### TypeScript SetUp

```bash
pnpm add typescript -D #[.bin/tsc]
pnpm add -D @types/node #[xyz.d.ts  type defination files in node]
pnpm tsc --init  #[create tsconfig file]
```

> ✅ **Use `tsx` for development**  
>  tsx watch src/server.ts
> ✅ **Use `tsc + node` for production**
> tsc --watch & node --watch dist/server.js
> ❌ **Never run `.ts` directly with Node**

```text
NOTE:- You can use biomejs for linting and formatting
```

---

#### Prettier SetUp

- For Consistant Code style enforced within the team
- setup it in project through config

```bash
pnpm add --save-dev --save-exact prettier  #[save-exact is imp bcoz these type of package update too frequently]
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\ndist\ncoverage\n')"
pnpm exec prettier . --write
```

---

#### Eslint setUp

- Find and fix your code
- Statically analyzes ur code

```bash
pnpm add --save-dev eslint @eslint/js typescript-eslint
```

---

#### Git Hooks

```bash
pnpm add --save-dev lint-staged # requires further setup
pnpm add --save-dev husky
pnpm exec husky init
echo "pnpm exec lint-staged" > .husky/pre-commit #[its a folder]
```

NOTE :- since pre-commit command runs for whole project not just for the files/code commited
hence to optimize so that pre-commit command runs for only commited files, we will use another package named ==lint-staged==

```text
	pnpm exec ❌ scripts
	pnpm run  ✅ scripts
	pnpm exec ✅ binaries
  pre-commit → lint-staged → ESLint + Prettier
  pre-push   → tests
```

---

#### Config App ENV

```bash
  PORT=5555 node dist/server.js
  #OR
  pnpm add dotenv   # can use dotenvx [encrypted]
  echo "PORT=5555" > .env
```

---

#### Express App Config

- ExpressJs is Fast, unopinionated, minimalist web framework for Node.js

```bash
  pnpm add express
  pnpm add @types/express -D
  pnpm add -D tsx

  pnpm tsx watch src/server.ts
```

---

#### SetUp Logger

- It helps in Logging / Analyses / debuging in app
  > pnpm add winston

---

#### Error Handling

> NOTE: NOT use http-errors package

###### 🔚 Final Architecture Flow

```txt
  Controller
    ↓
  Use Case / Service
    ↓
  Repository (DB Adapter)
    ↓
  AppError (ONLY)
    ↓
  Global Error Handler
    ↓
  Stable JSON Error Response
```

---

#### Auto test setting up

Vitest

- Testing and assertion library
- AAA -> Arrange , Act, Assert
  SuperTest
- Testing HTTP request
- It will fake an HTTP request
- It uses Express Under the hood
- It creates an isolated env for testing

```bash
pnpm add -D vitest supertest @types/supertest
pnpm add -D @vitest/coverage-v8
mkdir test
cd test
touch health.test.ts
```

---

#### Creating Project Template

```bash
git remote -v
git remote add template git@github.com:<username>/express-init-template.git
git push template main
```

###### Make the Repo a **GitHub Template**

On GitHub:

1. Go to repo **Settings**
2. Enable **“Template repository”**
3. Save

---
