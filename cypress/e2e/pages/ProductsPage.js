export class ProductPage {
  elements = {
    filterDropdown: () => cy.get('[data-test="product_sort_container"]'),
    firstProduct: () =>
      cy.get(
        ":nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price"
      ),
    lastProduct: () =>
      cy.get(
        ":last-child() > .inventory_item_description > .pricebar > .inventory_item_price"
      ),
    inventoryList: () => cy.get(".inventory_list"),
    backpackAddToCartButton: () =>
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]'),
    backpackRemoveButton: () =>
      cy.get('[data-test="remove-sauce-labs-backpack"]'),
    cartButton: () => cy.get(".shopping_cart_link"),
    cartBadge: () => cy.get(".shopping_cart_badge"),
    cartItem: () => cy.get(".cart_item"),
    cartItemName: () => cy.get(".inventory_item_name"),
  };

  // selectLowToHigh() {
  //   this.elements.filterDropdown().as("dropdown");
  //   cy.get("@dropdown").select("Price (low to high)");
  // }

  // selectHighToLow() {
  //   this.elements.filterDropdown().as("dropdown");
  //   cy.get("@dropdown").select("Price (high to low)");
  // }

  selectFilterOrder(direction) {
    this.elements.filterDropdown().as("dropdown");
    cy.get("@dropdown").select(
      direction === "lohi"
        ? "Price (low to high)"
        : direction === "hilo"
        ? "Price (high to low)"
        : null
    );
  }

  getFirstProductPrice() {
    return this.elements.firstProduct().invoke("text");
  }

  getLastProductPrice() {
    return this.elements.lastProduct().invoke("text");
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
    this.elements.backpackAddToCartButton().click();
  }

  verifyRemoveButtonAppears() {
    this.elements.backpackRemoveButton().should("be.visible");
  }

  openCart() {
    this.elements.cartButton().click();
  }

  verifyProductAddedToCart() {
    this.addToCart();
    this.verifyRemoveButtonAppears();
    this.openCart();
    this.elements.cartBadge().should("have.text", 1);
    this.elements.cartItem().should("be.visible");
    this.elements.cartItemName().should("have.text", "Sauce Labs Backpack");
    this.elements.backpackRemoveButton().should("be.visible");
  }
}
