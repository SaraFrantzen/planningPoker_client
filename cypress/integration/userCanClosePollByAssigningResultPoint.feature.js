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
    cy.login();
    cy.get("[data-cy='poll-1']").click();
  });

  context("successfully", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        params: { result: 2 },
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:poll_closed.json",
      });
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:poll_show_state_closed.json",
      });
    });
    it("user can assign value", () => {
      cy.get('[data-cy="assign"]').click();
      cy.get('[data-cy="value-select"]').contains(2).click({ force: true });
      cy.get('[data-cy="submit"]').click();
      cy.visit("/");
      cy.get("[data-cy='poll-1']").click();
      cy.get('[data-cy="poll-closed-message"]').should(
        "contain",
        "Poll is completed"
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
      cy.get('[data-cy="assign"]').click();
      cy.get('[data-cy="value-select"]').contains(2).click({ force: true });
      cy.get('[data-cy="submit"]').click();
      cy.get('[data-cy="error-message"]').should(
        "contain",
        "Unauthorized, You need to sign in before you can proceed"
      );
    });
  });
});
