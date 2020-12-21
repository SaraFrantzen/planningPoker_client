describe("Visitor can see a specific poll", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls",
      response: "fixture:polls.json",
    });
	});
	
  context("successfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:polls_show.json",
      });
      cy.visit("/");
    });
    it("visitor can click on an poll and view its full content", () => {
      cy.get("[data-cy='poll-1']").click();
      cy.get("[data-cy='tasks']").should(
        "contain",
        "Index action. Routes to that action. Polls model: title, description. Polls index in serializer."
      );
    });
  });
});
