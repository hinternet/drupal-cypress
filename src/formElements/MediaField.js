class MediaField {

  constructor(){

    /**
     * It's set in the the .env file the MediaFidlSelector to save space/time to write a long selector element that will repeat all the time.
     */
    this.MediaFieldSelector = Cypress.env('MediaFieldSelector');
  }
  /**
   *
   * @param {string} addMedia  Add media button selector.
   * @param {string} fileSelector Browse button selector.
   * @param {string} fileName he name of the file to upload; it must be in the folder fixtures.
   * @param {string} altSelector Alt textfield selector.
   * @param {string} altDescription Description text to type inside the textfield.
   * @param {string} save Partial "save button" selector.
   * @param {string} addChoosen Parial "insert selected button" selector.
   * @param {string} url Url with the ajax callback to link the media entity with the another entity (node, taxonomy, paragraphs, blocks...).
   */
  mediaLibrary(addMedia, fielSelector, fileName, altSelector, altDescription, save, addChoosen, url) {
    // Ejemplo de selectores:

    // input[data-drupal-selector='edit-field-media-picture-open-button']
    cy.get(addMedia).click();

    // 'input[name="files[upload]"]'
    cy.get(fielSelector).attachFile(fileName);

    // input[data-drupal-selector='edit-media-0-fields-field-media-image-0-alt']
    cy.get(altSelector).type(altDescription);

    // .toolbar-tray-open > .ui-dialog > .ui-dialog-buttonpane > .ui-dialog-buttonset > .button
    cy.get(this.MediaFieldSelector + save).click();

    // .toolbar-tray-open > .ui-dialog > .ui-dialog-buttonpane > .ui-dialog-buttonset > .media-library-select
    cy.get(this.MediaFieldSelector + addChoosen).click();

    cy.intercept({
      method: "POST",
      // TODO Check who it works with languages negotiation in the url (/en/...).
      url: url
    }).as("addChoosen");

    cy.wait("@addChoosen");
  }

 }

module.exports = MediaField;