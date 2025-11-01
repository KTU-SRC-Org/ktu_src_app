#  KTU SRC App

>  The official mobile platform for the Koforidua KTU Students' Representative Council.")

---

## 📖 Table of Contents

- [KTU SRC App](#ktu-src-app)
  - [📖 Table of Contents](#-table-of-contents)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Project](#running-the-project)
        - [On MacOs (for IOS simulator)](#on-macos-for-ios-simulator)
        - [On Windows (for Android emulator)](#on-windows-for-android-emulator)
        - [Instructions on how to start the local development server.](#instructions-on-how-to-start-the-local-development-server)
        - [To start the app](#to-start-the-app)
  - [💻 Tech Stack](#-tech-stack)
  - [📁 Project Structure](#-project-structure)
    - [Folder Explanations](#folder-explanations)
  - [🛠️ Building Features (Contribution Guidelines)](#️-building-features-contribution-guidelines)
    - [Feature Branch Workflow](#feature-branch-workflow)
    - [Coding Standards (Dos \& Don'ts)](#coding-standards-dos--donts)
      - [✅ **DO**](#-do)
      - [❌ **DON'T**](#-dont)
    - [Dependency Management (Libraries)](#dependency-management-libraries)
  - [🧪 Testing](#-testing)
  - [🚀 Deployment](#-deployment)
  - [⚖️ License](#️-license)

---

## 🚀 Getting Started

This section will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites

List all the software and tools developers need to have installed *before* they can run your project.

* **Node.js:** `v18.x` or higher (Download [here](https://nodejs.org/))
* **npm** / **pnpm:**  `npm@10.x` or `pnpm@9.15.x` (FYI: We use pnpm for installations)
* **Git:** (Download [here](https://git-scm.com/))
* **A Code Editor:** [VS Code](https://code.visualstudio.com/) (Recommended) or Cursor or Webstorm
* **Database:** You may need to set up Supabase instance locally or use a remote supabase account for development.

### Installation

Provide step-by-step instructions on how to get the development environment running.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ktu-src-app.git](https://github.com/your-username/ktu-src-app.git)
    cd ktu-src-app
    ```
2.  **Install dependencies:**
    (Choose the command for your project's package manager)
    ```bash
    pnpm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file.
    ```bash
    cp .env.example .env
    ```
    > Now, open the `.env` file and fill in the required variables (like database URLs, API keys, etc.).

4.  **Run database migrations (if applicable):**
    ```bash
    pnpm run db:migrate
    ```

### Running the Project

`Currently we are using Expo go for development but might more to a development build in the future.`

##### On MacOs (for IOS simulator)
`Check out the Expo docs :` [IOS Expo dev](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated)

##### On Windows (for Android emulator)
`Check out the Expo docs :` [Android Expo dev](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated)

##### Instructions on how to start the local development server.

```bash
npx expo start -c
```

*or*

```bash
pnpm start
```

The application should now be running on [exp://172.20.10.2:8081](https://www.google.com/search?q=exp://172.20.10.2:8081).

##### To start the app
`Press a to run on android emulator or device`
`Press i to run on ios simulator or device`

Please refer to the Expo documentation for further instructions on running the app on your device or simulator.

-----

## 💻 Tech Stack

A high-level list of the main technologies used in the project. This helps new developers understand the ecosystem at a glance.

* **Frontend:** React, React Native, Tailwind CSS, NativeWind, TypeScript
* **State Management:** Zustand
* Core Libraries:
    * **Data Fetching & Caching:** React Query
    * **Form Handling:** React Hook Form
    * **Navigation:** Expo router
    * **Authentication:** Supabase Auth
* Libraries to note:
    * **Date Manipulation:** date-fns
    * **Icons:** React Native Vector Icons
    * **React Native reusable components:** UI components built on top of shadcn/ui
    * **React Native reanimated:** For animations
    * **Localization:** i18next
    * **React Native Worklets:** For new threads (In terms of performance)
* **Backend:** Supabase
* **Database:** PostgreSQL (Supabase)
* **Testing:** Jest, React Testing Library
* **Deployment:** Expo EAS

-----

## 📁 Project Structure

Here is the high-level structure of the repository, followed by an explanation of what each key folder is for.

```text
ktu-src-app/
├── .github/        # GitHub Actions, PR templates
├── .vscode/        # Recommended VS Code settings and extensions
├── assets/         # Static assets (images, fonts, favicons)
├── app/         # layouts and screens for app routes
├── components/  # Shared, reusable UI components (buttons, modals)
├── constants/        # dummy data and constant values
├── core/        # Third-party setups eg: Localization setup
├── features/        # Feature-specific modules (auth, profile, dashboard)
├── hooks/        # Custom React hooks
├── lib/        # Helper functions, utility scripts, API clients
├── store/      # State management (Zustand, Redux, Context)
├── translation/        # i18n translation files
├── utils/      # General utility functions
├── styles/     # Global stylesheets
├── types/      # Shared TypeScript type definitions
├── app.json        # Expo configuration for app
├── .env.example    # Example environment variables
├── .eslintrc.json  # ESLint configuration
├── .gitignore      # Files to be ignored by Git
├── package.json    # Project dependencies and scripts
├── README.md       # This file
└── tsconfig.json   # TypeScript configuration
```

### Folder Explanations

* **`app`**: Contains all the routes/layouts and screens for the application. Each folder inside represents a URL segment.
* **`components`**: Home for all reusable UI components.
    * **`/builders`**: Custom components that extend other UI components in the ui folder or third-party.
    * **`/ui`**: Small, "dumb" components (e.g., `Button.tsx`, `Input.tsx`).
    * **`/common`**: Larger components made of smaller ones (e.g., `Navbar.tsx`, `Footer.tsx`).
    * **`/shared`**: Components shared across multiple features but not globally (e.g., `UserCard.tsx`).
    * **`/cards`**: Components specifically designed as cards (e.g., `ProductCard.tsx`).
* **`features`**: A component that put together multiple components with logic
* **`lib`**: Utility functions, and API client configurations. (e.g., `utils.ts`, `useAuth.ts`).
* **`hooks`**: Custom React hooks for shared logic (e.g., `useFetchData.ts`).
* **`/store`**: Global state management. Each "slice" of the store should be in its own file (e.g., `userStore.ts`).
* **`utils`**: General utility functions that don't fit elsewhere (e.g., `dateFormatter.ts`).
* **`assets`**: All static assets. Files here are served from the root (e.g., `/logo.png`).

-----

## 🛠️ Building Features (Contribution Guidelines)

This section outlines the patterns and rules all developers must follow when building new features or fixing bugs.

### Feature Branch Workflow

We use a Git workflow based on feature branches.

1.  **Pull the latest changes:**
    Make sure your `main` (or `dev`) branch is up-to-date.

    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Create a new branch:**
    Branch names must follow this pattern:

    * **Feature:** `feat/feature-name` or `feat:(🛠️)-feature-name` (e.g., `feat/user-profile-page`)
    * **Bugfix:** `fix/bug-description` or `fix:(👾)-bug-description` (e.g., `fix/login-button-crash`)
    * **Chore/Docs:** `chore/task-name` or `chore:(🫩)-update-readme` (e.g., `chore/update-readme`)

    <!-- end list -->

    ```bash
    git checkout -b feat/your-feature-name
    ```

3.  **Code & Commit:**
    Make your changes. Commit messages should be clear and follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

    * **Good:** `feat: add user login form`
    * **Good:** `fix: correct password validation error`
    * **Bad:** `updated files`

4.  **Push and Open a Pull Request (PR):**
    Push your branch to the remote repository.

    ```bash
    git push -u origin feat/your-feature-name
    ```

    Go to GitHub and open a Pull Request (PR) from your branch to the `main` (or `develop`) branch. Fill out the PR template, describing your changes.

5.  **Code Review:**
    At least one other team member must review and approve your PR before it can be merged.

### Coding Standards (Dos & Don'ts)

To maintain code quality and consistency, please follow these rules.

#### ✅ **DO**

* **Follow the Linter:** Run `pnpm run lint` before committing. All code must be free of linting errors.
* **Write in TypeScript:** All new code should be written in TypeScript (`.tsx` or `.ts`) with the appropriate types if present.
* **Use Naming Conventions:**
    * **Screens:** `Snake Case` (e.g., `marketplace-screen.tsx`) (do try as much as possible to use a single word if possible and addition of the word `screen` is optional)
    * **Components:** `PascalCase` (e.g., `UserProfile.tsx`) (components in the `ui` folder can use snake case)
    * **Variables/Functions:** `camelCase` (e.g., `getUserData`)
    * **Types/Interfaces:** `PascalCase` (e.g., `IUserProfile` or `UserProfileType`)
* **Comment Complex Logic:** If you write code that is not obvious, leave a comment explaining *why* it's done that way, not *what* it does.
* **Write Tests:** All new features or bug fixes must be accompanied by unit or integration tests. (No testing as of now )
* **Use Environment Variables:** Never hard-code sensitive information (API keys, database strings) directly in the code. Use the `.env` file.

#### ❌ **DON'T**

* **Don't Push to `main`:** Never commit or push directly to the `main` branch. All changes must go through a PR.
* **Don't Leave `console.log`:** Remove all `console.log` statements before opening a PR.
* **Don't Install Unnecessary Libraries:** (See next section).
* **Don't Write "Magic Strings":** Store reusable strings (like error messages or route paths) in a constants file (e.g., `src/lib/constants.ts`).
* **Don't Mix Default and Named Exports:** Each component file should use `export default YourComponent;`. Helper files (`lib`) should use named exports (`export const myFunc;`). **NB:** Some components might need to use named export instead of default, it is understandable
* **The * as imports:** Please avoid using `import * as Something from 'some-library'`. Instead, import only what you need: `import { SpecificThing } from 'some-library'`.
* **Don't import React** in every file: With the new JSX Transform in React 17+, you no longer need to import React at the top of your files. Avoid unnecessary imports.
* **Don't use inline styles:** Use Tailwind CSS classes or StyleSheet objects instead of inline styles for consistency and performance.

### Dependency Management (Libraries)

This covers which libraries to install and which to avoid.
* **First point of contact:** Expo's set of libraries should be your first location if you need to use a library [Expo Libraries](https://docs.expo.dev/versions/latest/sdk/expo/)
* **To Install a Library:** Before adding a new dependency, **you must discuss it with the team lead**. We want to keep the project light and avoid duplicate packages.
    * If approved, install it: `pnpm add package-name` (for runtime) or `pnpm add package-name -D` (for dev tools).
* **Libraries to AVOID (eg) :**
    * **jQuery:** We use React for all DOM manipulation.
    * **Moment.js:** This is a large, legacy library. Use `date-fns` or `dayjs` for date manipulation.
    * **Lodash (full library):** If you need a utility, import it directly to avoid pulling in the entire library (e.g., `import get from 'lodash/get'`).

    #### FYI: Avoid adding large libraries that significantly increase the bundle size unless absolutely necessary. 

-----

## 🧪 Testing
Below is just a placeholder , we dont test in the project yet
This project uses **Jest** for unit testing.

* **Run all tests:**
  ```bash
  npm test
  ```
* **Run tests in watch mode:**
  ```bash
  npm test -- --watch
  ```
* **Test File Location:** All test files should be located next to the file they are testing, with the `.test.tsx` or `.test.ts` extension.
  ```
  src/components/Button.tsx
  src/components/Button.test.tsx
  ```

-----

## 🚀 Deployment

To be updated later

-----

## ⚖️ License

This project is licensed under the [Private License](https://www.google.com/search?q=LICENSE).
