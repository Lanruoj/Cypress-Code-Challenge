export class ProductPage {
  filterDropdown = '[data-test="product_sort_container"]';
  firstProduct =
    ":nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price";
  lastProduct =
    ":last-child() > .inventory_item_description > .pricebar > .inventory_item_price";
  inventoryList = ".inventory_list";
  backpackAddToCartButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
  backpackRemoveButton = '[data-test="remove-sauce-labs-backpack"]';

  selectLowToHigh() {
    cy.get(this.filterDropdown).as("dropdown");
    cy.get("@dropdown").select("Price (low to high)");
  }

  selectHighToLow() {
    cy.get(this.filterDropdown).as("dropdown");
    cy.get("@dropdown").select("Price (high to low)");
  }

  getFirstProductPrice() {
    return cy.get(this.firstProduct).invoke("text");
  }

  getLastProductPrice() {
    return cy.get(this.lastProduct).invoke("text");
  }

  checkPriceOrder(direction) {
    if (direction === "lohi") {
      this.selectLowToHigh();
    } else if (direction === "hilo") {
      this.selectHighToLow();
    }
    // Get first & last product prices
    this.getFirstProductPrice().as("firstPrice");
    this.getLastProductPrice().as("lastPrice");
    // Compare prices to check which order list is in
    cy.get("@firstPrice").then((firstProduct) => {
      cy.get("@lastPrice").then((lastProduct) => {
        // Parse whole number from prices
        const firstPriceInteger = Number(
          firstProduct.split("$")[1].split(".")[0]
        );
        const lastPriceInteger = Number(
          lastProduct.split("$")[1].split(".")[0]
        );
        if (direction === "lohi") {
          expect(firstPriceInteger).to.be.lessThan(lastPriceInteger);
        } else if (direction === "hilo") {
          expect(firstPriceInteger).to.be.greaterThan(lastPriceInteger);
        }
      });
    });
  }

  addToCart() {
    cy.get(this.backpackAddToCartButton).click();
  }

  verifyRemoveButtonAppears() {
    cy.get(this.backpackRemoveButton).should("be.visible");
  }
}
