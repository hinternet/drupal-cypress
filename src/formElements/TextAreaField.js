class TextAreaField {

  /**
   * Function to write the text inside the text are element.
   * @param {string} value The value to add to the HTML element.
   * @param {string} selector HTML selector.
   * To make it works we must use the ID, we cannot use data-drupal-selector.
   * @param {object} options Widget object.
   */
  type(value, selector, options) {
    this[options.widget](value,selector)
  }

  /**
   * @param {string} value Element value.
   * @param {string} selector Html element selector.
   */
  ckeditor(value, selector){
    cy.ckeditor(value, selector);
  }

  /**
   * @param {string} value Element value.
   * @param {string} selector Html element selector.
   */
  noCkeditor(value, selector){
    cy.get(selector).type(value);
  }
}

module.exports = TextAreaField;