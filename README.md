<div align="center">
<img src="src/assets/logo150x150.png" />
    <h1>wannadbFrontend</h1>
    <p>The wannadb as a web app.</p>
</div>

---

-   [Installation](#installation)
    -   [Installation for development](#installation-for-development)
    -   [Installation for production](#installation-for-production)
-   [Start the development server](#start-the-development-server)
-   [Project structure](#project-structure)
-   [Stable version](#stable-version)
-   [Deploying](#deploying)
-   [Visual Studio Code](#visual-studio-code)
-   [Scripts](#scripts)
-   [Gnerate a new React component](#gnerate-a-new-react-component)
-   [Git hooks](#git-hooks)
-   [Packages and tools](#packages-and-tools)

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

6. [Start the frontend development server](#start-the-development-server)

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

## Start the development server

To start the frontend development server run:

```bash
npm run start
```

This script will make preparations to start the frontend development server:

-   Check if the backend server is running (_if not it will warn you_)
-   Creates the table structure in the backend server (_if not already created_)
-   Start the frontend development server and opens the browser

**_Check the console for instructions!_**

> Note that also the backend server should be running. Otherwise the frontend will not work correctly. See [here](https://github.com/lw86ruwo/wannadbBackend) for more information.

---

## Project structure

-   **[.github](.github)** - GitHub related files
    -   **[workflows](.github/workflows)** - GitHub actions workflows
-   **[.husky](.husky)** - Git hooks managed by husky
-   **[.vscode](.vscode)** - Visual Studio Code settings
-   **[scripts](scripts)** - Scripts for development
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

## Stable version

To manage stable versions of the frontend, a separate branch `stable` is used. When you have a stable version of the frontend, you can merge it into the `stable` branch. This will ensure that in the stable branch is always a version of the frontend that is working.

To create a new stable version, you have the following options:

-   Run the `Create New Stable Version (Manual)`workflow:
    -   Go to the `Actions` tab on GitHub
    -   Select the `Create New Stable Version (Manual)` workflow
    -   Open the `Run workflow` dropdown
    -   Click on the `Run workflow` button again
-   Run the `Create New Stable Version (Push)` workflow:
    -   Create a commit with the message containing `[stable]` and push it to the `main` branch. This will trigger the `Create New Stable Version (Push)` workflow and create a new stable version.

> The same concept applies to the backend and makes sure (when you have done it correctly) that the stable versions of the frontend and backend are always compatible and stable.

---

## Deploying

To deploy a new version of the frontend you can run the `scripts/deploy.sh` script. This script will update the frontend and backend to the latest version.

You can specify from which branch you want to deploy from via the `-b`flag. E.g. When you want to the newest version from the `stable` branch you can run:

```bash
./scripts/deploy.sh -b stable
```

_**Note:**_ This script will only work if the frontend is in the directory `/home/wannadb/frontend` on the server and the backend is in the directory `/home/wannadb/backend` on the server. To change this you have to modify the environment variables in the script.

---

## Visual Studio Code

**I recommend using [Visual Studio Code](https://code.visualstudio.com/) as your IDE.**

When you open the project in Visual Studio Code it will ask you to install the recommended extensions. I recommend installing them.
In the [.vscode](.vscode) folder you can find some settings in the [settings.json.template](.vscode/settings.json.template) file. Copy the file and rename it to `settings.json`, so that the settings are applied.

---

## Scripts

Run a script with:

```bash
npm run <script-name>
```

-   **dev** - Start the frontend development server
-   **serve** - Start the frontend development server
-   **start** - Check and prepare the backend and start the frontend development server
-   **build** - Build the frontend
-   **lint** - Check for linting errors
-   **preview** - Preview the built frontend
-   **format** - Format the code
-   **format:check** - Check if the code is formatted
-   **test** - Run the tests
-   **test:watch** - Run the tests in watch mode
-   **prepare** - Install husky
-   **generate _\<component-name\>_** - Generate a new React component
-   **comment:check** - Check if all functions and classes have comments
-   **backend:check** - Checks if the backend is running
-   **backend:create** - Creates all the necessary resources in the backend
-   **txt:create** - Create some sample text files
-   **server:update** - Deploy the server to the latest version

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

## Git hooks

The commit hooks are managed by [husky](https://typicode.github.io/husky/#/).

-   **pre-commit** - Runs before the commit
    -   **Format** - Check if the code is formatted correctly
    -   **Linting** - Check for linting errors
    -   **Comment check** - Check if all functions and classes have a comment
    -   **Tests** - Run the tests
    -   **Build** - Build the frontend
-   **commit-msg** - Runs after the commit message is entered
    -   **Commit message** - Enforce more meaningful commit messages

> If you can't commit that means that one of the checks failed. Please fix the error and try again.

---

## Packages and tools

-   **Vite** - Bundler
-   **React** - Frontend library
-   **Typescript** - Typed JavaScript
-   **SAAS** - CSS preprocessor
-   **Axios** - HTTP client
-   **ESLint** - Linting utility for JavaScript and JSX
-   **Prettier** - Code formatter
-   **Huksy** - Git hooks
-   **Vitest** - Test runner
-   **Bootstrap Icons** - Icons
