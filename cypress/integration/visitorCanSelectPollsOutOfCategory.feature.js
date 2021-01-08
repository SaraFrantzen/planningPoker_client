describe("visitor can see all listed polls", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls",
      response: "fixture:polls.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls/?category=api",
      response: "fixture:polls_category_api.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls/?category=client",
      response: "fixture:polls_category_client.json",
    });

    cy.visit("/");
  });

  context("Visitor can see categories", () => {
    it("visitor can see different categories in the header", () => {
      cy.get("[data-cy='home']").should("contain", "Planning Poker");
      cy.get("[data-cy='api']").should("contain", "api");
      cy.get("[data-cy='client']").should("contain", "client");
    });
  });

  context("successfully - api", () => {
    it("Visitor can see the polls in the api category", () => {
      cy.get("[data-cy='api']").click();
      cy.get("[data-cy='poll-3']").within(() => {
        cy.contains("API provides abaility for users to create polls");
      });
    });
  });
  
  context("successfully - client", () => {
    it("Visitor can see the polls in the client category", () => {
      cy.get("[data-cy='client']").click();
      cy.get("[data-cy='poll-2']").within(() => {
        cy.contains("Visitor can see list of polls");
      });
    });
  });
});
