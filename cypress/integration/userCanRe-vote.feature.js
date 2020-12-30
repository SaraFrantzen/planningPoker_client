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
          response: "fixture:polls_update.json",
        });
      });
  
      it("user can re-vote", () => {
        cy.get('[data-cy="points"]').contains(0).click({ force: true });
        cy.get('[data-cy="vote"]').click();
        cy.get('[data-cy="vote-message"]').should(
          "contain",
          "You successfully voted 0 in this poll"
        );
        cy.get("[data-cy='points-0']").should("contain", "1");
        cy.get("[data-cy='re-vote']").click();
        cy.get("[data-cy='points-0']").should("contain", nil);
        cy.get('[data-cy="points"]').contains("2").click({ force: true });
        cy.get('[data-cy="vote"]').click();
        cy.get('[data-cy="vote-message"]').should(
          "contain",
          "You successfully voted 2 in this poll"
        );
        cy.get("[data-cy='points-2']").should("contain", "1");
      });
    });
});