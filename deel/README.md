# Salary Insights Automation Test

## Overview

This repository contains automated tests for the Salary Insights page of the Deel application using Playwright. The tests are written in TypeScript and are designed to be data-driven, using test data from a local JSON file.

## Project Structure
- **e2e/components/salaryInsightsPage.component.ts**: Contains the Page Object Model (POM) for the Salary Insights page.
- **e2e/data/salary_insights.json**: Contains test data used for data-driven testing.
- **e2e/salary_insights.spec.ts**: Contains the test cases for the Salary Insights page.
- **playwright.config.ts**: Configuration file for Playwright.

## Setup and Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```
## Running the Tests
### Default Base URL
The default base URL for the tests is `https://growth.deel.training/dev/salary-insights`. This is set in the playwright.config.ts file.

### Run All Tests
To run all tests, use the following command:
```bash
npx playwright test
```
### Generate HTML Report
To generate an HTML report after running the tests, use the following command:

```bash
npx playwright show-report
```
### Run Tests with UI
To run tests with the Playwright UI, use the following command:

```bash
npx playwright test --ui
```

### Configuration
The playwright.config.ts file includes configurations for:
- Base URL
- Enabling video recording
- Retry logic
- Test reporters