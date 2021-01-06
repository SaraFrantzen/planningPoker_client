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
      cy.login();
      cy.get("[data-cy='poll-1']").click();
      cy.get('[data-cy="form-comment"]').within(() => {
        cy.get('[data-cy="comment"]').type("myComment");
      });
      cy.get('[data-cy="save-comment"]').contains("Post Comment").click();
      cy.get('[data-cy="save-comment-message"]').should(
        "contain",
        "successfully saved"
      );
    });
  });

  context("unsuccessfully - blank comment", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/comments",
        response: { message: "Comment can't be blank" },
      });
    });

    it("without comments body", () => {
      cy.login();
    cy.get("[data-cy='poll-1']").click();
      cy.get('[data-cy="save-comment"]').contains("Post Comment").click();
      cy.get('[data-cy="save-comment-message"]').should(
        "contain",
        "Comment can't be blank"
      );
    });
  });

  context("unsuccessfully - should not be possible when unauthorized", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/comments",
        response: { message: "You need to sign in or sign up before continuing." },
      });
    });

    it("without comments body", () => {  
    cy.get("[data-cy='poll-1']").click();
    cy.get('[data-cy="form-comment"]').should("not.exist")
    cy.get('[data-cy="authenticate-message"]').should(
      "contain",
      "You need to login to be able to post comments"
    );
    });
  });
});
