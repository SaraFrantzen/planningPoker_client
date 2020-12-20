describe("User can create poll", () => {
  beforeEach(() => {
    cy.server();
		cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls",
      response: "fixture:polls.json",
    });

		cy.visit("/");
		cy.get('[data-cy="createPoll"]').click();
    cy.login()
  });

  context("successfully created", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/polls",
        response: { message: "successfully saved" },
      });
		});
		
    it("user can successfully create polls", () => {
      cy.get('[data-cy="form-poll"]').within(() => {
        cy.get('[data-cy="title"]').type("Title");
        cy.get('[data-cy="description"]').type("description");
        cy.get('[data-cy="tasks"]').type("tasks");
      });
      cy.get('[data-cy="save-poll"]').contains("Save Poll").click();
      cy.get('[data-cy="save-poll-message"]').should(
        "contain",
        "successfully saved"
      );
    });
  });

  context("unsuccessfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/polls",
        response: { message: "Title can't be blank" },
      });
		});
		
    it("unsuccessfully without title", () => {
      cy.get('[data-cy="form-poll"]').within(() => {
        cy.get('[data-cy="description"]').type("description");
        cy.get('[data-cy="tasks"]').type("tasks");
      });
      cy.get('[data-cy="save-poll"]').contains("Save Poll").click();
      cy.get('[data-cy="save-poll-message"]').should(
        "contain",
        "Title can't be blank"
      );
    });
  });
});
