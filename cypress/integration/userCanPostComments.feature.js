describe("User can create poll", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls",
      response: "fixture:polls.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls/1",
      response: "fixture:polls_show.json",
    });
    cy.visit("/");
    cy.login();
    cy.get("[data-cy='poll-1']").click();
  });

  context("successfully created", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/comments",
        response: { message: "successfully saved" },
      });
    });

    it("user can successfully post a comment", () => {
      cy.get('[data-cy="form-comment"]').within(() => {
        cy.get('[data-cy="comment"]').type("myComment");
      });
      cy.get('[data-cy="save-comment"]').contains("Save Comment").click();
      cy.get('[data-cy="save-comment-message"]').should(
        "contain",
        "successfully saved"
      );
    });
  });
});
