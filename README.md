<div align="center">
<img src="src/assets/logo150x150.png" />
    <h1>wannadbFrontend</h1>
    <p>The wannadb as a web app.</p>
</div>

---

-   [Links](#links)
-   [Installation](#installation)
-   [Start](#start)
-   [Project structure](#project-structure)
-   [Visual Studio Code](#visual-studio-code)
-   [Scripts](#scripts)
-   [Gnerate a new React component](#gnerate-a-new-react-component)
-   [Add a TODO](#add-a-todo)
-   [Pre-commit hooks](#pre-commit-hooks)
-   [Extensions](#extensions)

---

## Links

-   [TODOS](./todos.md)
-   [IDEAS](./ideas.md)

---

## Installation

### Installation for development

1. Clone this repository with:

```bash
git clone https://github.com/cophilot/wannadbFrontend.git
```

2. Make sure to have [nodejs](https://nodejs.org/en), [npm](https://www.npmjs.com/) and [python](https://www.python.org/) installed.
3. Install the dependencies with:

```bash
npm install
```

4. Install husky with:

```bash
npm run prepare
```

5. Check the `.env.development` file and make sure all the variables are set correctly.

6. [Start the frontend development server](#start).

### Installation for production

1. Clone this repository with:

```bash
git clone https://github.com/cophilot/wannadbFrontend.git
```

2. Make sure to have [nodejs](https://nodejs.org/en), [npm](https://www.npmjs.com/) installed.
3. Install the dependencies with:

```bash
npm install
```

4. Check the `.env.production` file and make sure all the variables are set correctly.

5. Build the frontend wih:

```bash
npm run build
```

6. The built frontend will be in the `dist` folder.

---

## Start

To start the frontend development server run:

```bash
npm run start
```

This script will make preparations to start the newest version.

_Check the console for instructions!_

> Note that also the backend server should be running. Otherwise the frontend will not work correctly. See [here](https://github.com/lw86ruwo/wannadbBackend) for more information.

---

## Project structure

-   **[scripts](scripts)** - Scripts for the project
-   **[src](src)** - The source code
    -   **[assets](src/assets)** - The assets
    -   **[audio](src/audio)** - The audio files
    -   **[components](src/components)** - The React components
    -   **[data](src/data)** - Some data functions
    -   **[providers](src/providers)** - Custom React providers
    -   **[styles](src/styles)** - The styles
    -   **[types](src/types)** - Typescript types
    -   **[utils](src/utils)** - Utility classes and functions
    -   **[views](src/views)** - The views
-   **[templates](templates)** - Template for new React components

---

## Visual Studio Code

**I recommend using [Visual Studio Code](https://code.visualstudio.com/) as your IDE.**

When you open the project in Visual Studio Code it will ask you to install the recommended extensions. I recommend installing them.
In the [.vscode](.vscode) folder you can find some settings in the [settings.json.template](.vscode/settings.json.template) file. Copy the file and rename it to `settings.json`, so that the settings are applied.

---

## Scripts

Run a script with:

```bash
npm run <script>
```

-   **dev** - Start the frontend development server
-   **serve** - Start the frontend development server
-   **start** - Pull the latest changes and start the frontend development server
-   **build** - Build the frontend
-   **lint** - Check for linting errors
-   **preview** - Preview the built frontend
-   **format** - Format the code
-   **format:check** - Check if the code is formatted
-   **test** - Run the tests
-   **test:watch** - Run the tests in watch mode
-   **backend** - Start the backend server
-   **generate _\<component-name\>_** - Generate a new React component
-   **todo _\<todo\>_** - Add a new TODO
-   **comment:check** - Check if all functions and classes have a comment
-   **backend:check** - Checks if the backend is running
-   **backend:create** - Creates all the necessary resources in the backend
-   **txt:create** - Create some sample text files

---

## Gnerate a new React component

Please only use the following command to generate a new React component:

```bash
npm run generate <component-name>
```

This will generate a new React component in the [src/components](src/components) folder. The component will be named `<component-name>`. The component will be a functional component and will be exported by default.

This is for the purpose of consistency. So that all components are generated the same way.

> Example usage: `npm run generate MyFirstComponent`

---

## Stable Version

...

---

## Pre-commit hooks

The pre-commit hooks are managed by [husky](https://typicode.github.io/husky/#/).

-   **Format** - Check if the code is formatted correctly
-   **Linting** - Check for linting errors
-   **Comment check** - Check if all functions and classes have a comment
-   **Tests** - Run the tests
-   **Commit message** - Enforce more meaningful commit messages

> If you cant commit that means that one of the hooks failed. Please fix the error and try again.

---

## Extensions

-   **Vite** - Bundler
-   **ESLint** - Linting utility for JavaScript and JSX
-   **Prettier** - Code formatter
-   **Huksy** - Git hooks
-   **Vitest** - Test runner
-   **Jest** - Testing framework
