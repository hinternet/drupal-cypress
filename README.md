# Cypress-drupal-forms

This package add somo class to make more easy to write test for Drupal forms.

## Setup
Install this package via NPM:
```bash
npm install --dev cypress-drupal-forms
```

### How to work with it.

#### Load the class inside a page Object

```javascript
// cypress/e2e/pages/ArticlePage.js
const Property = require("cypress-drupal-forms").Property;
const Submit = require("cypress-drupal-forms").Submit;
const FileField = require("cypress-drupal-forms").FileField;
const TextField = require("cypress-drupal-forms").TextField;
const TextAreaField = require("cypress-drupal-forms").TextAreaField;


export default class ArticlePage {
  article_path = "/node/add/article";
  submitButton = 'input[data-drupal-selector="edit-submit"]';

  constructor() {
    this.Property = new Property();
    this.FileField = new FileField();
    this.TextAreaField = new TextAreaField();
    this.TextField = new TextField();
    this.Submit = new Submit();
  }

  userCanAccesArticlePage() {
    cy.visit(this.article_path, { failOnStatusCode: true });
  }

  havePermissionsToSeeNodeAddArticle() {
    cy.location("pathname").should("eq", this.article_path);
  }

  clickSubmitButttom() {
    cy.get(this.submitButton).click();
  }
}
```

Use the files in step_definitions files:
```javascript
// Cypress/support/step_definitions/articlePage.js
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const ArticlePage = require('../../e2e/pages/ArticlePage');
const articlePage = new ArticlePage();

const bodyAttribute = "edit-body-0-value";
const options = Cypress.env('Options');


Given('I am login as {string}', (user) => {
  cy.drupalLogin(user, user)
});

Given('I visit node add article', () => {
  articlePage.userCanAccesArticlePage();
});

And('I have permissions to see node add article form', () => {
  articlePage.havePermissionsToSeeNodeAddArticle();
});

Then('I see node add article form title {string}', (message) => {
  cy.get('h1').should('have.text', message);
});

And('I fill the title with {string}', (title) => {
  options.widget = 'noCkeditor';
  articlePage.TextField.type(
    title,
    articlePage.Property.set('edit-title-0-value'),
    options
  );
});

And('I fill the body with {string}', (body) => {
  options.widget = 'ckeditor';
  articlePage.TextAreaField.type(
    body,
    'edit-body-0-value',
    options
    );
});

And("I Upload a picture to the article", ()=>{
  articlePage.FileField.upload(
    articlePage.Property.set('edit-field-image-0-upload'),
    'picture_001.png',
    "/node/add/article?element_parents=field_image/widget/0&ajax_form=1&_wrapper_format=drupal_ajax",
    articlePage.Property.set('edit-field-image-0-alt'),
    'Esto es una descripción'
  );
});

And("I add the tag {string}", (tag) =>{
  options.widget = 'ckeditor';
  articlePage.TextField.type(
    tag,
    articlePage.Property.set('edit-field-tags-target-id'),
    options
  );
});

And("I click article page submit button", ()=>{
  articlePage.Submit.buttonClick(
    articlePage.Property.set('edit-submit')
  )
});
```

### Fills env files

This module needs three env variables:

```json
{
  "Property": "data-drupal-selector",
  "MediaFieldSelector": ".toolbar-tray-open > .ui-dialog > .ui-dialog-buttonpane > .ui-dialog-buttonset > ",
  "Options": {
    "widget": null,
    "delta": 0
  }
}
```
* Property: this is default drupal data selector.
* MediaFieldSelector: this is the css elementors needed to avoid hava a long string of html elements selector to updolad files throught media browser.
* Options: This is an object needt to set to values if the widget is or not ckeditor, and if delta of the elemnt, in some themes drupal has diferents buttons and we see one or another depending of the size of screens.
