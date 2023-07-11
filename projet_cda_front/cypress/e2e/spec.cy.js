describe('Connexion', () => {
  it('Se connecter en tant qu\'administrateur', () => {
    cy.visit('localhost:3000/login');

    // Remplir le formulaire de connexion
    cy.get('input[name="email"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('adminadmin');

    // Soumettre le formulaire
    cy.get('button[type="submit"]').click();

    // Cliquez sur le bouton "Ajouter au panier" d'un produit
    cy.get('.add-to-cart .txt').first().click();

     // Cliquez sur le lien "Panier" dans la navbar
    cy.contains('Panier').click();
  });

  it('devrait ajouter un produit au panier et accéder au panier', () => {
    // Cliquez sur le bouton "Ajouter au panier" d'un produit
    cy.get('.add-to-cart .txt').first().click();

    // Vérifiez si le panier contient le produit ajouté
    cy.get('.cart-item').should('have.length', 1);

    // Cliquez sur le lien "Panier" dans la navbar
    cy.contains('Panier').click();

    // Vérifiez si vous êtes sur la page du panier
    cy.url().should('include', '/panier');
  });
});

