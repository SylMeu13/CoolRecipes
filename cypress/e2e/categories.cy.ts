describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#root a[href="/recipe/53281"] h3').should('have.text', 'Algerian Kefta (Meatballs)');
    cy.get('#root span:nth-child(2)').click();
    cy.get('#root a[href="/recipe/53085"] h3').should('have.text', '15-minute chicken & halloumi burgers');
    cy.get('#root span:nth-child(3)').click();
    cy.get('#root a[href="/recipe/53120"] h3').should('have.text', 'Æbleskiver');
    cy.get('#root span:nth-child(4)').click();
    cy.get('#root a[href="/recipe/53262"] h3').should('have.text', 'Adana kebab');
    cy.get('#root span:nth-child(5)').click();
    cy.get('#root a[href="/recipe/53527"] h3').should('have.text', 'Achiote Oil (Aceite Achiotado) Recipe');
    cy.get('#root span:nth-child(6)').click();
    cy.get('#root a[href="/recipe/52839"] h3').should('have.text', 'Chilli prawn linguine');
    cy.get('#root span:nth-child(7)').click();
    cy.get('#root a[href="/recipe/52885"] h3').should('have.text', ' Bubble & Squeak');
    cy.get('#root span:nth-child(8)').click();
    cy.get('#root a[href="/recipe/53483"] h3').should('have.text', 'Acaraje black-eyed pea fritters with shrimp filling');
    cy.get('#root span:nth-child(9)').click();
    cy.get('#root a[href="/recipe/53373"] h3').should('have.text', 'Air Fryer Egg Rolls');
    cy.get('#root span:nth-child(10)').click();
    cy.get('#root a[href="/recipe/53169"] h3').should('have.text', 'Ajo blanco');
    cy.get('#root span:nth-child(11)').click();
    cy.get('#root a[href="/recipe/53092"] h3').should('have.text', 'Fasoliyyeh Bi Z-Zayt (Syrian Green Beans with Olive Oil)');
    cy.get('#root span:nth-child(12)').click();
    cy.get('#root a[href="/recipe/53158"] h3').should('have.text', 'Air fryer patatas bravas');
    cy.get('#root span:nth-child(13)').click();
    cy.get('#root a[href="/recipe/53430"] h3').should('have.text', 'Antiguan Breakfast (Chop Up and ‘Saltfish’)');
    cy.get('#root span:nth-child(14)').click();
    cy.get('#root a[href="/recipe/53354"] h3').should('have.text', 'Jamaican Curry Goat');
    cy.get('#root div.QnMvn span:nth-child(1)').click();
    cy.get('#root a[href="/recipe/53281"] h3').should('have.text', 'Algerian Kefta (Meatballs)');
  })
})