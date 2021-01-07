describe("User can assign result to poll", () => {
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

  context("successfully", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        params: { result: 2 },
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:poll_closed.json",
      });
    });
    it("user can assign value", () => {
      cy.get('[data-cy="value-select"]').contains(2).click({ force: true });
      cy.get('[data-cy="assign"]').click();
      cy.get('[data-cy="assign-message"]').should(
        "contain",
        "result successfully assigned"
      );
    });
  });
});
