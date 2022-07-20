class TextField {
  /**
   * Function to write the text inside the textfield element.
   * @param {string} value Element value.
   * @param {string} selector Html element selector.
   * @param {object} options Widget object.
   */
  type(value, selector, options) {
    this[options.widget](value,selector);
  }

  /**
   * @param {string} value Element value.
   * @param {string} selector Html element selector.
   */
  ckeditor(value, selector){
    cy.ckeditor(value, selector)
  }

  /**
   * @param {string} value Element value.
   * @param {string} selector Html element selector.
   */
  noCkeditor(value, selector){
    cy.get(selector).type(value);
  }
}

module.exports = TextField;
