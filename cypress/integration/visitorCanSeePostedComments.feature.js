describe("Visitor can see a specific poll's comments", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls",
      response: "fixture:polls.json",
    });
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls/1",
      response: "fixture:poll_show_state_pending.json",
    });
    cy.visit("/");
  });

  context("successfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/comments/1",
        response: "fixture:comments.json",
      });
    });

    it("visitor can click on an poll and view its comments", () => {
      cy.get("[data-cy='poll-1']").click();
      cy.get("[data-cy='comment-1']").within(() => {
        cy.get("[data-cy='body']").should("contain", "First comment");
        cy.get("[data-cy='user']").should("contain", "user1");
      });
    });
  });
});
