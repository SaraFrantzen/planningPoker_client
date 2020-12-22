Cypress.Commands.add("login", () => {
  cy.server();
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/auth/*",
    response: `fixture:successful_login.json`,
    headers: {
      uid: `user@epidemic.com`,
    },
  });

  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/polls",
    response: "fixture:polls.json",
  });

  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/auth/*",
    response: `fixture:successful_login.json`,
    headers: {
      uid: `user@epidemic.com`,
    },
  });
	cy.visit("/");
	cy.get('[data-cy="login"]').click();
  cy.get("[data-cy='login-form']").within(() => {
    cy.get("[data-cy='email']").type("user@epidemic.com");
    cy.get("[data-cy='password']").type("password");
    cy.get("[data-cy='submit']").click();
  });
});
