describe("User can join a poll", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls",
      response: "fixture:polls.json",
    });

    cy.visit("/");
    cy.get("[data-cy='poll-1']").click();
    cy.login();
  });

  context("successfully joined", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/polls",
        response: { message: "successfully joined" },
      });
    });

    it("user can join a poll", () => {
      cy.get('[data-cy="join-poll"]').click();
      cy.get('[data-cy="save-poll-message"]').should(
        "contain",
        "successfully joined"
      );
    });
  });
});
