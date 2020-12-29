describe("User can vote", () => {
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
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/polls/1",
      response: { message: "successfully joined this poll" },
    });
    cy.visit("/");
    cy.login();
    cy.get("[data-cy='poll-1']").click();
    cy.get('[data-cy="join-poll"]').click();
  });

  context("successfully voted", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: { message: "successfully voted" },
      });
    });

    it("user can vote", () => {
      cy.get('[data-cy="points"]').contains(2).click({ force: true });
      cy.get('[data-cy="vote"]').click();
      cy.get('[data-cy="vote-message"]').should(
        "contain",
        "successfully voted"
      );
    });
  });

  context("unsuccessfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: {
          error: "You already voted in this poll",
        },
        status: 404,
      });
    });

    it("visitor receives error message if already voted", () => {
      cy.get('[data-cy="vote"]').click();
      cy.get("[data-cy='error-message']").should(
        "contain",
        "You already voted in this poll"
      );
    });
  });
});
