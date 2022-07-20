class Submit {

  /**
   * @param {string} Selector Html element selector.
   * @param {number} Index The element selector, sometimes we can have two or more elements with the same selecector, for exameple when we have multiples buttons for multiples range of screens.
   */
  buttonClick(Selector, Index = 0) {
    cy.get(Selector).eq(Index).click();
  }
}

module.exports =  Submit;
