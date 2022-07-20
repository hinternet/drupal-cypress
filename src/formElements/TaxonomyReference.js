class TaxonomyReference {

  /**
   *
   * @param {string || array} value Elements values.
   * @param {string || array} selector Html element selector.
   * @param {object} options Object with the widget to use.
   */
  set(value, selector, options) {
    this[options.widget](value, selector);
  }

  /**
   *
   * @param {string} value Element value.
   * @param {string} selector Html element selector.
   */
  select(value, selector) {
    cy.get(selector).select(value);
  }

  /**
   *
   * @param {string} value Element value.
   * @param {string} selector Html element selector.
   */
  radioButton(value, selector) {
    cy.get(selector).check(value);
  }

  /**
   *
   * @param {array} values Element values
   * @param {array} selector Html element selectors.
   */
  checkBoxes(values, selector) {

    var values_map = [];

    values.hashes().forEach(element => {
      values_map.push(element);
    });

    for (var index = 0; index < values_map.length; index++) {
      cy.get(selector[index]).check(values_map[index]);
    }
  }

  /**
   *
   * @param {string} value Element value.
   * @param {string} selector Html element selector.
   */
  autocomplete(value, selector) {
    cy.get(selector).type(value);
  }
}

module.exports = TaxonomyReference;
