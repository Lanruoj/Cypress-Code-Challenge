export class ProductPage {
  elements = {
    filterDropdown: () => cy.get('[data-test="product_sort_container"]'),
    allProductPrices: () => cy.get(".inventory_item_price"),
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

  verifyPriceFilter(direction) {
    this.selectFilterOrder(direction);
    let price = direction === "lohi" ? 0 : Infinity;
    this.elements.allProductPrices().each(($price) => {
      const priceInteger = Number($price.text().replace(/\D/g, ""));
      cy.wrap(priceInteger).should(
        `be.${direction === "lohi" ? "gte" : "lte"}`,
        price
      );
      price = priceInteger;
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

  verifyAllProductsAddToCart() {
    let productCount = 0;
    // Click all "add to cart" buttons
    cy.get(".btn_inventory")
      .each(($button) => {
        cy.wrap($button).click();
        productCount++;
      })
      .then(() => {
        // Verify that cart badge & item list equals amount of products
        this.elements.cartBadge().should("have.text", productCount);
        this.elements.cartButton().click();
        this.elements.cartItem().should("have.length", productCount);
      });
  }
}
