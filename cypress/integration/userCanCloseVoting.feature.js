describe("User can close voting", () => {
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

  context("successfully closed", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:pollsVoting_closed.json",
      });
    });

    it("user can close voting in a poll", () => {
      cy.get('[data-cy="close-voting"]').click();
      cy.get('[data-cy="close-voting-message"]').should(
        "contain",
        "Voting succesfully closed"
      );
    });
  });
});
