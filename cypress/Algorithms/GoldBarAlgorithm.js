class GoldBarAlgorithm {
  constructor(goldBarPage) {
    this.goldBarPage = goldBarPage;
    this.selectors = {
      weighings_list: "//div[@class='game-info']//li",
      result_button: `//button[@id="reset" and not(contains(text(), 'Reset'))]`,
      bar_button: (barNumber) => `//button[contains(@id, 'coin') and contains(text(), '${barNumber}')]`,
      left_input: (index) => `#left_${index}`,
      right_input: (index) => `#right_${index}`,
    };
  }

  // Get the value of a specific bowl cell on either sides (left or right)
  getBarInput(side, index) {
    return cy.get(this.selectors[`${side}_input`](index));
  }

  // We have to ensure that there are equal bars in both bowls for accurate results
  validateBars(bars) {
    expect(bars.length).to.be.at.least(1);
    expect(new Set(bars).size).to.equal(bars.length);
  }

  // Clear the bowl cells
  clearBowls() {
    this.goldBarPage.clickResetButton();
  }

  // Populate the bowl cells with gold bars
  fillBowls(leftBars, rightBars) {
    this.validateBars(leftBars);
    this.validateBars(rightBars);

    this.clearBowls();
    
    leftBars.forEach((bar, index) => this.getBarInput('left', index).clear().type(bar));
    rightBars.forEach((bar, index) => this.getBarInput('right', index).clear().type(bar));
  }

  // Check that the weighings list when valid values are entered and the weight button is clicked
  checkWeighings() {
    cy.waitUntil(() => cy.xpath(this.selectors.weighings_list).should('be.visible'), {
      timeout: 3000,
      interval: 200,
    });
  }

  // Verify that the 'Result' field changes accordingly after every weighing
  checkResult() {
    return cy.waitUntil(() => 
      cy.xpath(this.selectors.result_button)
        .invoke('text')
        .then(resultSign => {
          return ['<', '=', '>'].includes(resultSign);
        }),

      // The DOM is rendered dynamically, so we have to wait till there is a change to the 'Result' sign before validation
      {
        errorMsg: 'Result sign did not become <, =, or > within the expected time',
        timeout: 4000,
        interval: 200
      }
    ).then(() => {
      return cy.xpath(this.selectors.result_button)
        .invoke('text')
        .then(resultSign => {
          expect(resultSign).to.be.oneOf(['<', '=', '>']);
          return resultSign;
        });
    });
  }

  // Retrieve the Bar Button selector
  getBarButton(barNumber) {
    return cy.xpath(this.selectors.bar_button(barNumber));
  }

  // Click on the fake bar using the 'getBarButton' function
  clickBar(barNumber) {
    this.getBarButton(barNumber).click();

    // Verify that the alert message is displayed accurately
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal('Yay! You find it!')
      assert.include(txt, 'Yay! You find it!', 'Alert message is correct');
    });
  }

  // Run the alogithm to determine the fake gold bar
  runAlgorithm() {

    // Create 3 gold bar groups since we know exactly how many bars we have
    const group1 = [0, 1, 2];
    const group2 = [3, 4, 5];
    const group3 = [6, 7, 8];

    // Weigh the first group of bars against the second group
    this.fillBowls(group1, group2);
    this.goldBarPage.clickWeighButton();
    this.checkWeighings();

    this.checkResult().then(result1 => {

      // This condition is when the fake gold bar is in group 1
      if (result1 === '<') {
        this.goldBarPage.clickResetButton();
        this.fillBowls([group1[0]], [group1[1]]);
        this.goldBarPage.clickWeighButton();
        this.checkWeighings();
        this.checkResult().then(result2 => {
          if (result2 === '<') {
            this.clickBar(group1[0]);
          } else if (result2 === '>') {
            this.clickBar(group1[1]);
          } else {
            this.clickBar(group1[2]);
          }
        });

        // This condition is when the fake bar is in group 2
      } else if (result1 === '>') {
        this.goldBarPage.clickResetButton();
        this.fillBowls([group2[0]], [group2[1]]);
        this.goldBarPage.clickWeighButton();
        this.checkWeighings();
        this.checkResult().then(result2 => {
          if (result2 === '<') {
            this.clickBar(group2[0]);
          } else if (result2 === '>') {
            this.clickBar(group2[1]);
          } else {
            this.clickBar(group2[2]);
          }
        });

        // This condition is when the fake bar is in group 3
      } else {
        this.goldBarPage.clickResetButton();
        this.fillBowls([group3[0]], [group3[1]]);
        this.goldBarPage.clickWeighButton();
        this.checkWeighings();
        this.checkResult().then(result2 => {
          if (result2 === '<') {
            this.clickBar(group3[0]);
          } else if (result2 === '>') {
            this.clickBar(group3[1]);
          } else {
            this.clickBar(group3[2]);
          }
        });
      }
    });
  }

  // Verify that we have a complete list of weighings
  getWeighList() {
    cy.get('ol').children('li').should('have.length', 2);
  }

  // Log the weighings list and output to a txt file
  displayWeighings() {
    let weighings = [];
    cy.get('ol').children('li').each(($li) => {
      cy.wrap($li).invoke('text').then((text) => {
        weighings.push(text);
      });
    }).then(() => {
      const weighingsList = weighings.map((weighing, index) => `Weighing ${index + 1}: ${weighing}`).join('\n');
      cy.log(`Weighings:\n${weighingsList}`);
      cy.writeFile('cypress/fixtures/weighings.txt', weighingsList);
    });
  }
}

export default GoldBarAlgorithm;
