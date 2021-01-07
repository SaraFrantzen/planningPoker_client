describe("User can post comment", () => {
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
      response: "fixture:poll_show_state_pending.json",
    });
    cy.visit("/");
  });

  context("successfully posted", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/comments",
         response: "fixture:commentsPost.json",
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
      cy.get("[data-cy='comment-1']").within(() => {
        cy.get("[data-cy='body']").should("contain", "myComment");
        cy.get("[data-cy='user']").should("contain", "user1");
      });
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
