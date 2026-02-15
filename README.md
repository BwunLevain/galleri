# Galleri

A web-based stamp collection gallery featuring search and category filtering functionality. This project is built with vanilla JavaScript and includes a comprehensive test suite.

## Features

* Filter stamps by category (Fish, Insects, Birds, Mammals).
* Search stamps by specific tags.
* Responsive design for mobile and desktop.
* Unit tested filtering logic with 100% code coverage.
* Automated CI pipeline via GitHub Actions.

## Installation

To set up the project and prepare the testing environment, run the following command in your terminal:

```bash
npm install

```

## Testing

The project uses Jest for unit testing the core logic. You can run the tests using:

```bash
npm test

```

Additional scripts are available for watching tests and generating coverage reports:

* `npm run test:watch`: Runs tests in watch mode.
* `npm run test:coverage`: Generates a full coverage report.

## CI/CD Status

The test passes in vscode but I don't know why it doesn't pass on GitHub :(

<img width="1920" height="1020" alt="image" src="[https://github.com/user-attachments/assets/62af46a3-1adf-4c22-8b32-1d38ef5b0dae](https://github.com/user-attachments/assets/62af46a3-1adf-4c22-8b32-1d38ef5b0dae)" />

## Directory Structure

* `index.html`: Main entry point.
* `scripts/logic.js`: Core filtering and search logic.
* `scripts/gallery.test.js`: Jest unit tests.
* `.github/workflows/ci.yml`: GitHub Actions configuration.
* `coverage/`: Automated test coverage reports.

## Linting

Code quality is maintained using ESLint. Run the linter configuration via:

```bash
npm run lint
