class FileField {

  /**
   * Upload files to Filefields field.
   *
   * @param {string} fileSelector input file selector
   * @param {string} fileName the name of the file to upload; it must be in the folder fixtures.
   * @param {string} url Url with the ajax callback to uplodad the file.
   * It should be something like:
   * /node/add/article?element_parents=field_image/widget/0&ajax_form=1&_wrapper_format=drupal_ajax.
   * @param {string} altSelector Alt textfield selector.
   * @param {string} altDescription Description text to type inside the textfield.
   */
  upload(fileSelector, fileName, url, altSelector, altDescription) {
    cy.get(fileSelector).attachFile(fileName);

    cy.intercept({
      method: "POST",
      url: url
    }).as("load");

    cy.wait("@load");

    cy.get(altSelector).type(
      altDescription
    );
  }
}

module.exports =  FileField ;

