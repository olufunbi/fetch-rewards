import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import { GoldBarPage } from '../../Pages';
import { GoldBarAlgorithm } from '../../Algorithms';

const goldBarPage = new GoldBarPage();
const goldBarAlgorithm = new GoldBarAlgorithm(goldBarPage);

When('I click on the {string} button', (buttonText) => {
  cy.xpath(`//button[@id="${buttonText.toLowerCase()}" and contains(text(), '${buttonText}')]`)
    .should('be.visible')
    .click();
});

When('I find the fake bar and verify "Yay, You found it!" alert is displayed', () => {
  goldBarAlgorithm.runAlgorithm();
});

When('I get the weighing list', () => {
  goldBarAlgorithm.getWeighList();
});

Then('the weighings list should be saved in a text file', () => {
  goldBarAlgorithm.getWeighList();
});
