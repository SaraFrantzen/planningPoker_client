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
      response: "fixture:polls_show.json",
    });
    cy.visit("/");
    cy.get("[data-cy='poll-1']").click();
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

    it("visitor can click on an poll and view its full content", () => {
      cy.get("[data-cy='comment-1']").within(() => {
        cy.get("[data-cy='body']").should("contain", "myComment");
      });
    });
  });
});
