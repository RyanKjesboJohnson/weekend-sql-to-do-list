describe('SQL TO-DO List', () => {
  beforeEach(async () => {
    // Silence console.log statements for cleaner test output:
    console.log = () => {}

    // We need Cypress to finish loading locahost:${PORT}/ before
    // we execute each test:
    await cy.visit('/')
  })

  // Verify that the app renders the two initial to-do items
  // that were provided in database.sql:
  it('READ: Displays initial to-do items upon load', () => {
    // Test that two elements with a data-testid value of "toDoItem" exist:
    cy.get('[data-testid="toDoItem"]')
      .should('have.length', 2)

    // Test that an element with a data-testid value of "toDoItem" and
    // text content that includes "Build a CRUD app" exists:
    cy.contains('[data-testid="toDoItem"]', 'Build a CRUD app', { matchCase: false })
      .should('exist')

    // Test that an element with a data-testid value of "toDoItem" and
    // text content that includes "Make my app look nice" exists:
    cy.contains('[data-testid="toDoItem"]', 'Make my app look nice', { matchCase: false })
      .should('exist')
  })

  // Verify that the app behaves correctly when two new
  // to-do items are created via the form:
  it('CREATE: Creates new to-do items', () => {
    // Create a new to-do with text 'Feed the cat',
    //  using the form's input and button:
    cy.get('[data-testid="toDoTextInput"]')
      .type('Feed the cat')
    cy.get('[data-testid="submitButton"]')
      .click()

    // Reset input, in case the student doesn't:
      // The next test will fail if the input isn't cleared:
    cy.get('[data-testid="toDoTextInput"]').clear();

    // Test that this causes the number of to-do items
    // to increase from two to three:
    cy.get('[data-testid="toDoItem"]')
      .should('have.length', 3)
    
    // Test that the newly created to-do item contains
    // the text that was typed into the input:
    cy.contains('[data-testid="toDoItem"]', 'Feed the cat', { matchCase: false })
      .should('exist')
    

    // Do those 👆 three things again, but with new to-do text:
    cy.get('[data-testid="toDoTextInput"]')
      .type('Snuggle the cat')
    cy.get('[data-testid="submitButton"]')
      .click()
    cy.get('[data-testid="toDoItem"]')
      .should('have.length', 4)
    cy.contains('[data-testid="toDoItem"]', 'Feed the cat', { matchCase: false })
      .should('exist')
  })

  // Verify that the app behaves correctly when two to-do
  // items have their "delete" buttons clicked:
  it('DELETE: Deletes a to-do item after its "delete" button is clicked', () => {
    // Click the 'Feed the cat' to-do item's "delete" button:
    cy.contains('[data-testid="toDoItem"]', 'Feed the cat', { matchCase: false })
      .find('[data-testid="deleteButton"]')
      .click()
    
    // Test that the number of to-do items has dropped from
    //    four to three:
    cy.get('[data-testid="toDoItem"]')
      .should('have.length', 3)

    // Test that a to-do item with the text 'Feed the cat'
    //    does not exist:
    cy.contains('[data-testid="toDoItem"]', 'Feed the cat', { matchCase: false })
      .should('not.exist')


    // Do those 👆 three things again:
    cy.contains('[data-testid="toDoItem"]', 'Make my app look nice', { matchCase: false })
      .find('[data-testid="deleteButton"]')
      .click()
    cy.contains('[data-testid="toDoItem"]', 'Make my app look nice', { matchCase: false })
      .should('not.exist')
    cy.get('[data-testid="toDoItem"]')
      .should('have.length', 2)
  })

  // Verify that the app behaves correctly when two to-do
  // items have their "complete" buttons clicked:
  it('UPDATE: Applies the "completed" CSS class to a to-do item after its "complete" button is clicked', () => {
    // Test that no to-do items have the "completed" CSS
    // class applied:
    cy.get('[data-testid="toDoItem"]')
      .should('not.have.class', 'completed')

    // Click the 'Build a CRUD app' to-do item's complete button:
    cy.contains('[data-testid="toDoItem"]', 'Build a CRUD app', { matchCase: false })
      .find('[data-testid="completeButton"]')
      .click()
   
    // Test that the number of to-do items that have
    // the "completed" CSS class applied is now 1:
    cy.get('[data-testid="toDoItem"].completed')
      .should('have.length', 1)

    // Test that the 'Build a CRUD app' to-do item is
    // the to-do item that now has the "completed"
    // CSS class applied to it:
    cy.contains('[data-testid="toDoItem"].completed', 'Build a CRUD app', { matchCase: false })
      .should('exist')


    // Go through that 👆 whole process again, but with the
    // 'Snuggle the cat' to-do item:
    cy.contains('[data-testid="toDoItem"]', 'Snuggle the cat', { matchCase: false })
      .find('[data-testid="completeButton"]')
      .click()
    cy.get('[data-testid="toDoItem"].completed')
      .should('have.length', 2)
    cy.contains('[data-testid="toDoItem"].completed', 'Snuggle the cat', { matchCase: false })
      .should('exist')
  })
})