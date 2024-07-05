import { test, expect } from "@playwright/test";
import SalaryInsightsPage from "./components/salaryInsightsPage.component";
import * as fs from "fs";
import path from "path";

// Define the type for the test data
interface TestData {
  role: string;
  country: string;
}

// Load test data from JSON file
const testDataPath = path.resolve(__dirname, "data", "salary_insights.json");
let salaryTestData: TestData[];

try {
  const rawData = fs.readFileSync(testDataPath, "utf8");
  salaryTestData = JSON.parse(rawData) as TestData[];
} catch (error) {
  console.error("Error reading or parsing testdata.json:", error);
  process.exit(1); // Exit the process with an error code
}

test.describe("Salary Insights Tests", () => {
  salaryTestData.forEach(({ role, country }) => {
    test(`Should display correct compensation info for ${role} in ${country}`, async ({
      page,
    }) => {
      await page.goto("/dev/salary-insights");
      await page.waitForLoadState("load"); // Wait for the page to load

      // Wait for the specific network request to complete
      await page.waitForResponse(
        (response) =>
          response.url().includes("/salary_insights/data") &&
          response.status() === 200
      );

      const salaryInsightsPage = new SalaryInsightsPage(page);

      await salaryInsightsPage.selectRole(role);
      await salaryInsightsPage.selectCountry(country);
      await salaryInsightsPage.clickSearch();

      await salaryInsightsPage.verifyCompensationInfo(role, country);
    });
  });
});
