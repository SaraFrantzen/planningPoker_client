describe("User can join a poll", () => {
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
    cy.visit("/");
    cy.login();
    cy.get("[data-cy='poll-1']").click();
  });

  context("successfully joined", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls/1",
        response: { message: "successfully joined this poll" },
      });
    });

    it("user can join a poll", () => {
      cy.get('[data-cy="join-poll"]').click();
      cy.get('[data-cy="join-poll-message"]').should(
        "contain",
        "You are joined to this poll"
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
          error: "You already joined this poll",
        },
        status: 404,
      });
    });

    it("visitor receives error message if already joined", () => {
      cy.get('[data-cy="join-poll"]').click();
     
      cy.get("[data-cy='error-message']").should(
        "contain",
        "You already joined this poll"
      );
    });
  });
});
