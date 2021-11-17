import { func } from "prop-types"

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const testUser = {
      name: 'Tester Test',
      username: 'testuser',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Tester Test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('#error').contains('Wrong username or password!')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.get('#create-button').click()
      cy.get('#title').type('a test blog')
      cy.get('#author').type('Tester Test')
      cy.get('#url').type('http://www.test.com')
      cy.get('#submit-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('a test blog Tester Test')
    })

    it('A blog can be liked', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('Likes 1')
    })

    it('Submitter can remove blog', function() {
      cy.get('#view-button').click()
      cy.get('#remove-button').click()
      cy.should('not.contain', 'a test blog Tester Test')
    })

    it('Blogs are ordered by like amount', function() {

      cy.get('#create-button').click()
      cy.get('#title').type('First blog')
      cy.get('#author').type('Keijo')
      cy.get('#url').type('http://www.test.com')
      cy.get('#submit-button').click()

      cy.get('#create-button').click()
      cy.get('#title').type('Second blog')
      cy.get('#author').type('Anna')
      cy.get('#url').type('http://www.test.com')
      cy.get('#submit-button').click()

      cy.wait(2000)

      cy.get('#blogs>div').eq(1)
        .find('#view-button')
        .click()
      cy.get('#blogs>div').eq(1)
        .find('#like-button')
        .click()

      cy.get('#blogs>div').eq(2)
        .find('#view-button')
        .click()

      cy.get('#blogs>div').eq(2)
        .find('#like-button')
        .click()
      cy.get('#blogs>div').eq(2)
        .find('#like-button')
        .click()

      cy.visit('http://localhost:3000')

      cy.get('#blogs>div>#title>p').eq(0).contains('Second blog')
      cy.get('#blogs>div>#title>p').eq(1).contains('First blog')
      cy.get('#blogs>div>#title>p').eq(2).contains('a test blog')
      
    })
  })  
})