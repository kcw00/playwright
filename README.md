# Testing project with Playwright

---

This repository provides a step-by-step guide on how to set up Playwright for testing your project.

---

## Installation

1. To install Playwright, run this command
    `npm init playwright@latest`

2. Define npm script for running test and test reports in package.json

    ```javascript
    "test": "playwright test",
    "test:report": "playwright show-report"
    ```

    add the values above into `"scripts"` section

---

## Configuration

1. Add an npm script for the backend of the project. This will enable the backend to be started in test mode

    In the backend's package.json,

    ```javascript
    "start:test": "NODE_ENV=test node index.js"
    ```

    add the value above into `"scripts"` section

2. Change some default settings in playwright.config.js
     ```javascript
     export default defineConfig({
            ...
            /* Reduce the waiting time to prevent unnecessary waiting for failed tests*/
            timeout: 3000,
            /* Run tests sequentially. Since the project uses a database, parallel execution causes problems.*/
            fullyParallel: false, 
            ...
            use : {
                /* Base URL to use in actions like `await page.goto('')`. */
                baseURL: 'http://localhost:5173', /* -> the frontend address */
            }
            ...
        })
     ```
---

## Usage

### To test my NoteApp project
Before testing the project, follow these steps below  
   1. Clone only the `testwithplaywright` branch  
        `git clone --branch testwithplaywright --single-branch https://github.com/kcw00/NoteApp.git`

   2. Start the frontend of the project  
        `cd NoteApp/frontend`  `npm run dev`

   3. Start the backend of the project in test mode with this command  
        `cd NoteApp/backend` and `npm run start:test`


1. To run all tests, run this command `npm test`
    Tests can also be run via the graphical UI with command
        `npm run test -- --ui`
2. To open test reports, run this command 
    `npm run test:report`

3. To run a single test, run this command 
    `npm test -- -g "TEST NAME"`

4. To run a test in debug mode, run this command
    `npm test -- -g'TEST NAME' --debug`

5. To save a trace of the tests, run this command
    `npm run test -- --trace on`

