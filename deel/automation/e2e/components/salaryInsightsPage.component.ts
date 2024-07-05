import { Page } from "playwright";
import { expect } from "playwright/test";

class SalaryInsightsPage {
  private page: Page;
  private elements: { [key: string]: string };

  constructor(page: Page) {
    this.page = page;

    this.elements = {
      roleDropDown: '//div[@data-qa="role-field"]//*[@data-testid="ExpandMoreIcon"]',
      inputRole: '//input[@name="role"]',
      selectRoleByName: '//li[@data-text="%name%"]',
      countryDropDown: '//div[@data-qa="country-field"]//*[@data-testid="ExpandMoreIcon"]',
      inputCountry: '//input[@name="country"]',
      countryListContainer: '//ul[@role="listbox"]',
      buttonSearchId: '//button[text()="Search"]',
      filterContainer: '//div[@data-qa="filter-bar"]',
      salaryTableContainer: '//div[@data-qa="salary-table"]',
      headingCompensationDetailsId: '//div[@data-qa="salary-table"]/h2',
      headingCompensationInfoId: '//div[@id="promo-section-container"]//h3',
    };
  }

  async selectRole(role: string): Promise<void> {
    await this.page.locator(this.elements.roleDropDown).click();
    await this.page.fill(this.elements.inputRole, role);
    await this.page.click(this.elements.selectRoleByName.replace("%name%", role));
  }

  async selectCountry(country: string): Promise<void> {
    await this.page.click(this.elements.countryDropDown);
    await this.page.fill(this.elements.inputCountry, country);
    await this.page.locator(this.elements.countryListContainer).getByText(country).click();
  }

  async clickSearch(): Promise<void> {
    await this.page.click(this.elements.buttonSearchId);
  }

  async verifyCompensationInfo(role: string, country: string): Promise<void> {
    await expect(this.page.locator(this.elements.filterContainer).getByText(role)).toBeVisible();
    await expect(this.page.locator(this.elements.filterContainer).getByText(country)).toBeVisible();
    expect(await this.page.locator(this.elements.headingCompensationDetailsId).innerText()).toContain(role);
    expect(await this.page.locator(this.elements.headingCompensationDetailsId).innerText()).toContain(country);
    expect(await this.page.locator(this.elements.headingCompensationInfoId).innerText()).toContain(country);
  }
}

export default SalaryInsightsPage;