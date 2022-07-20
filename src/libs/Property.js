class Property {

  /**
   * The constructor load the values from Cypress env file.
   */
  constructor(){
    this.property = Cypress.env('Property');
  }

  /**
   * Build default drupal property
   *
   * @param {string} value
   * @param {string} html html tag to build selector
   * @returns
   *   Returns a string with the html property build
   */
  set(value, html = 'input') {
    return  html + "[" + this.property + "='" + value + "']";
  }
}

module.exports = Property;