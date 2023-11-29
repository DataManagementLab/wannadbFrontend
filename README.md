# wannadbFrontend

The wannadb as a web app.

---

-   [Links](#links)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Visual Studio Code](#visual-studio-code)
-   [Scripts](#scripts)
-   [Pre-commit hooks](#pre-commit-hooks)
-   [Extensions](#extensions)

---

## Links

-   [TODOS](./todo.md)
-   [IDEAS](./ideas.md)

---

## Installation

1. Clone the repository with:

```bash
git clone https://github.com/phil1436/wannadbFrontend.git
```

2. Make sure to have [nodejs](https://nodejs.org/en) and [npm](https://www.npmjs.com/) installed.
3. Install the dependencies with:

```bash
npm install
```

4. Make sure to have python installed.
5. Install the requirements with:

```bash
cd backend
pip install -r requirements.txt
```

---

## Usage

1. Start the frontend with:

```bash
npm start
```

2. Start the backend with in a new terminal:

```bash
npm run backend
```

3. Open [localhost:5173](http://localhost:5173) in your browser.

---

## Visual Studio Code

**I recommend using [Visual Studio Code](https://code.visualstudio.com/) as your editor.**

When you open the project in Visual Studio Code it will ask you to install the recommended extensions. I recommend installing them.
In the [.vscode](.vscode) folder you can find some settings in the [settings.json.template](.vscode/settings.json.template) file. Copy the file and rename it to `settings.json`, so that the settings are applied.

---

## Scripts

Run a script with:

```bash
npm run <script>
```

-   **dev** - Start the frontend development server
-   **start** - Start the frontend development server
-   **build** - Build the frontend
-   **lint** - Check for linting errors
-   **preview** - Preview the built frontend
-   **format** - Format the code
-   **test** - Run the tests
-   **test:watch** - Run the tests in watch mode
-   **backend** - Start the backend server
-   **generate** - Generate a new React component

---

## Pre-commit hooks

The pre-commit hooks are managed by [husky](https://typicode.github.io/husky/#/).

-   **Format** - Format the code
-   **Linting** - Check for linting errors
-   **Tests** - Run the tests

> If you cant commit that means that one of the hooks failed. Please fix the error and try again.

---

## Extensions

-   **Vite** - Bundler
-   **ESLint** - Linting utility for JavaScript and JSX
-   **Prettier** - Code formatter
-   **Huksy** - Git hooks
-   **Vitest** - Test runner
-   **Jest** - Testing framework
