export class ProductPage {
  filterDropdown = '[data-test="product_sort_container"]';
  productsList = ".inventory_list";

  selectLowToHigh() {
    cy.get(this.filterDropdown).as("dropdown");
    cy.get("@dropdown").select("Price (low to high)");
  }

  compareLowToHigh() {
    cy.get(this.productsList).eq(0).should("contain.text", "Sauce Labs Onesie");
  }
}
