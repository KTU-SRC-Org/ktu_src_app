#  KTU SRC App

> A brief, one-sentence description of what the project does. (e.g., "The official mobile and web platform for the KTU Students' Representative Council.")

---

## 📖 Table of Contents

* [🚀 Getting Started](#-getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Running the Project](#running-the-project)
* [💻 Tech Stack](#-tech-stack)
* [📁 Project Structure](#-project-structure)
* [🛠️ Building Features (Contribution Guidelines)](#️-building-features-contribution-guidelines)
    * [Feature Branch Workflow](#feature-branch-workflow)
    * [Coding Standards (Dos & Don'ts)](#coding-standards-dos--donts)
    * [Dependency Management](#dependency-management)
* [🧪 Testing](#-testing)
* [🚀 Deployment](#-deployment)
* [⚖️ License](#️-license)

---

## 🚀 Getting Started

This section will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites

List all the software and tools developers need to have installed *before* they can run your project.

* **Node.js:** `v18.x` or higher (Download [here](https://nodejs.org/))
* **npm** / **yarn** / **pnpm:** `npm@9.x` or `yarn@1.22.x`
* **Git:** (Download [here](https://git-scm.com/))
* **A Code Editor:** [VS Code](https://code.visualstudio.com/) (Recommended)
* **Database:** (e.g., PostgreSQL `v14` or MongoDB Atlas account)

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
    npm install
    ```
    *or*
    ```bash
    yarn install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file.
    ```bash
    cp .env.example .env
    ```
    > Now, open the `.env` file and fill in the required variables (like database URLs, API keys, etc.).

4.  **Run database migrations (if applicable):**
    ```bash
    npm run db:migrate
    ```

### Running the Project

Instructions on how to start the local development server.

```bash
npm run dev
````

The application should now be running on [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

-----

## 💻 Tech Stack

A high-level list of the main technologies used in the project. This helps new developers understand the ecosystem at a glance.

* **Frontend:** React, Next.js, Tailwind CSS, TypeScript
* **Backend:** Node.js, Express.js, Prisma
* **Database:** PostgreSQL
* **Testing:** Jest, React Testing Library
* **Deployment:** Vercel (for frontend), Heroku (for backend)

-----

## 📁 Project Structure

Here is the high-level structure of the repository, followed by an explanation of what each key folder is for.

```text
ktu-src-app/
├── .github/        # GitHub Actions, PR templates
├── .vscode/        # Recommended VS Code settings and extensions
├── public/         # Static assets (images, fonts, favicons)
├── src/            # Main application source code
│   ├── app/        # (e.g., Next.js 13+ app router) or pages/
│   ├── components/ # Shared, reusable UI components (buttons, modals)
│   ├── lib/        # Helper functions, utility scripts, API clients
│   ├── store/      # State management (Zustand, Redux, Context)
│   ├── styles/     # Global stylesheets
│   └── types/      # Shared TypeScript type definitions
├── .env.example    # Example environment variables
├── .eslintrc.json  # ESLint configuration
├── .gitignore      # Files to be ignored by Git
├── package.json    # Project dependencies and scripts
├── README.md       # This file
└── tsconfig.json   # TypeScript configuration
```

### Folder Explanations

* **`src/app`**: Contains all the routes and pages for the application. Each folder inside represents a URL segment.
* **`src/components`**: Home for all reusable UI components.
    * **`/ui`**: Small, "dumb" components (e.g., `Button.tsx`, `Input.tsx`).
    * **`/common`**: Larger components made of smaller ones (e.g., `Navbar.tsx`, `Footer.tsx`).
    * **`/features`**: Components specific to a certain feature (e.g., `src/components/features/events/EventCard.tsx`).
* **`src/lib`**: Utility functions, custom hooks, and API client configurations. (e.g., `utils.ts`, `useAuth.ts`).
* **`src/store`**: Global state management. Each "slice" of the store should be in its own file (e.g., `userStore.ts`).
* **`public`**: All static assets. Files here are served from the root (e.g., `/logo.png`).

-----

## 🛠️ Building Features (Contribution Guidelines)

This section outlines the patterns and rules all developers must follow when building new features or fixing bugs.

### Feature Branch Workflow

We use a Git workflow based on feature branches.

1.  **Pull the latest changes:**
    Make sure your `main` (or `develop`) branch is up-to-date.

    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Create a new branch:**
    Branch names must follow this pattern:

    * **Feature:** `feat/feature-name` (e.g., `feat/user-profile-page`)
    * **Bugfix:** `fix/bug-description` (e.g., `fix/login-button-crash`)
    * **Chore/Docs:** `chore/task-name` (e.g., `chore/update-readme`)

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

* **Follow the Linter:** Run `npm run lint` before committing. All code must be free of linting errors.
* **Write in TypeScript:** All new code should be written in TypeScript (`.tsx` or `.ts`).
* **Use Naming Conventions:**
    * **Components:** `PascalCase` (e.g., `UserProfile.tsx`)
    * **Variables/Functions:** `camelCase` (e.g., `getUserData`)
    * **Types/Interfaces:** `PascalCase` (e.g., `IUserProfile` or `UserProfileType`)
* **Comment Complex Logic:** If you write code that is not obvious, leave a comment explaining *why* it's done that way, not *what* it does.
* **Write Tests:** All new features or bug fixes must be accompanied by unit or integration tests.
* **Use Environment Variables:** Never hard-code sensitive information (API keys, database strings) directly in the code. Use the `.env` file.

#### ❌ **DON'T**

* **Don't Push to `main`:** Never commit or push directly to the `main` branch. All changes must go through a PR.
* **Don't Leave `console.log`:** Remove all `console.log` statements before opening a PR.
* **Don't Install Unnecessary Libraries:** (See next section).
* **Don't Write "Magic Strings":** Store reusable strings (like error messages or route paths) in a constants file (e.g., `src/lib/constants.ts`).
* **Don't Mix Default and Named Exports:** Each component file should use `export default YourComponent;`. Helper files (`lib`) should use named exports (`export const myFunc;`).

### Dependency Management (Libraries)

This covers which libraries to install and which to avoid.

* **To Install a Library:** Before adding a new dependency, **you must discuss it with the team lead**. We want to keep the project light and avoid duplicate packages.
    * If approved, install it: `npm install package-name` (for runtime) or `npm install package-name -D` (for dev tools).
* **Libraries to AVOID:**
    * **jQuery:** We use React for all DOM manipulation.
    * **Moment.js:** This is a large, legacy library. Use `date-fns` or `dayjs` for date manipulation.
    * **Lodash (full library):** If you need a utility, import it directly to avoid pulling in the entire library (e.g., `import get from 'lodash/get'`).

-----

## 🧪 Testing

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

This section describes how the application is deployed to production.

* **Frontend (Vercel):** The frontend is deployed automatically. Any push or merge to the `main` branch will trigger a new production deployment on Vercel.
* **Backend (Heroku):** The backend requires a manual push or is connected to a `release` branch (TBD).

-----

## ⚖️ License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE).
