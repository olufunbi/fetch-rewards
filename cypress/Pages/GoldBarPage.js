class GoldBarPage {
  constructor() {
    this.selectors = {
      weigh_button: `//button[@id="weigh" and contains(text(), 'Weigh')]`,
      reset_button: `//button[@id="reset" and contains(text(), 'Reset')]`,
    };
  }

  clickWeighButton () {
    cy.xpath(this.selectors.weigh_button)
      .should('be.visible')
      .click();
  };

  clickResetButton () {
    cy.xpath(this.selectors.reset_button)
      .should('be.visible')
      .click();
  };

}

export default GoldBarPage;
