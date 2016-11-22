const utils = require('../../utils/e2e-mongoose');
const fetch = require('node-fetch');

const mockComment = 'This is a test comment.';
const mockUser = {
  email: `${new Date().getTime()}@test.com`,
  name: 'Test User',
  pw: 'testtesttest'
};

module.exports = {
  '@tags': ['embed-stream', 'post'],
  'User Registers and posts a comment with premod off': client => {
    fetch(`${client.globals.baseUrl}/api/v1/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        moderation: 'post'
      })
    }).then(() => {
      //Load Page
      client.resizeWindow(1200, 800)
        .url(client.globals.baseUrl)
        .frame('coralStreamIframe')

        //Register and Log In
        .waitForElementVisible('#commentBox', 1000)
        .waitForElementVisible('#coralSignInButton', 2000)
        .click('#coralSignInButton')
        .waitForElementVisible('#coralRegister', 1000)
        .click('#coralRegister')
        .waitForElementVisible('#email', 1000)
        .setValue('#email', mockUser.email)
        .setValue('#displayName', mockUser.name)
        .setValue('#password', mockUser.pw)
        .setValue('#confirmPassword', mockUser.pw)
        .click('#coralSignUpButton')
        .waitForElementVisible('#coralLogInButton', 10000)
        .click('#coralLogInButton')
        .waitForElementVisible('#commentBox', 3000)

        // Post a comment
        .setValue('#commentBox .coral-plugin-commentbox-textarea', mockComment)
        .click('#commentBox .coral-plugin-commentbox-button')
        .waitForElementVisible('.comment', 1000)

        //Verify that it appears
        .assert.containsText('.comment', mockComment);
    });
  },
  'User Registers and posts a comment with premod on': client => {
    fetch(`${client.globals.baseUrl}/api/v1/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        moderation: 'pre'
      })
    }).then(() => {
      //Load Page
      client.resizeWindow(1200, 800)
        .url(client.globals.baseUrl)
        .waitForElementVisible('body', 2000)
        .frame('coralStreamIframe')

        //Register and Log In
        .waitForElementVisible('#commentBox', 10000)
        .waitForElementVisible('#coralSignInButton', 2000)
        .click('#coralSignInButton')
        .waitForElementVisible('#coralRegister', 1000)
        .click('#coralRegister')
        .waitForElementVisible('#email', 1000)
        .setValue('#email', mockUser.email)
        .setValue('#displayName', mockUser.name)
        .setValue('#password', mockUser.pw)
        .setValue('#confirmPassword', mockUser.pw)
        .click('#coralSignUpButton')
        .waitForElementVisible('#coralLogInButton', 10000)
        .click('#coralLogInButton')
        .waitForElementVisible('#commentBox', 3000)

        // Post a comment
        .setValue('#commentBox .coral-plugin-commentbox-textarea', mockComment)
        .click('#commentBox .coral-plugin-commentbox-button')
        .waitForElementVisible('#coral-notif', 1000)

        //Verify that it appears
        .assert.containsText('#coral-notif', 'moderation team');
    });
  },
  after: client => {
    utils.after();
    client.end();
  }
};
