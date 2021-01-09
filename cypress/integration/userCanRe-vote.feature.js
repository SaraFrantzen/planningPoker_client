describe("User can re-vote", () => {
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
      response: "fixture:poll_show_state_ongoing.json",
    });
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/polls/1",
      response: { message: "successfully joined this poll" },
    });
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/polls/1",
      response: "fixture:polls_vote.json",
    });
    cy.visit("/");
    cy.login();
    cy.get("[data-cy='poll-1']").click();
    cy.get('[data-cy="join-poll"]').click();
    cy.get('[data-cy="vote-select"]').contains(2).click({ force: true });
    cy.get('[data-cy="vote"]').click();
  });

  context("successfully un-voted", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:polls_un-vote.json",
      });
    });

    it("user can un-vote to be able to re-vote", () => {
      cy.get("[data-cy='re-vote']").click();
      cy.get('[data-cy="vote-message"]').should(
        "contain",
        "Your previous vote is now removed"
      );
      cy.get("[data-cy='points-2']").should("not.exist");
      cy.get('[data-cy="vote"]').should("be.visible");
      cy.get('[data-cy="user-vote-message"]').should("not.exist");
      cy.get('[data-cy="join-poll-message"]').should(
        "contain",
        "You are joined to this poll"
      );
    });
  });

  context("unsuccessfully - usersession breaks", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: "Unauthorized, You need to sign in before you can proceed",
      });
    });

    it("visitor receives error message if user-session broke", () => {
      cy.get('[data-cy="re-vote"]').click();
      cy.get("[data-cy='error-message']").should(
        "contain",
        "Unauthorized, You need to sign in before you can proceed"
      );
    });
  });
});
