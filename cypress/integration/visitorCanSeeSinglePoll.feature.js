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
      cy.get("[data-cy='points-2']").should("contain", "1");
      cy.get("[data-cy='image']").should("be.visible");
      cy.get("[data-cy='poker-logo']").should("not.be.visible");
    });
  });

  context("successfully, no image attached", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/polls/1",
        response: "fixture:polls_show_noImage.json",
      });
      cy.visit("/");
    });
    it("visitor can click on an poll and view its full content", () => {
      cy.get("[data-cy='poll-1']").click();
      cy.get("[data-cy='tasks']").should(
        "contain",
        "Index action. Routes to that action. Polls model: title, description. Polls index in serializer."
      );
      cy.get("[data-cy='points-2']").should("contain", "1");
      cy.get("[data-cy='image']").should("not.be.visible");
      cy.get("[data-cy='poker-logo']").should("be.visible");
      
    });
  });

  context("unsuccessfully", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/polls/1",
        response: {
          error: "Poll not found, try again later!",
        },
        status: 404,
      });
      cy.visit("/");
    });

    it("visitor receives error message if poll is not found", () => {
      cy.get("[data-cy='poll-1']").click();
      cy.get("[data-cy='error-message']").should(
        "contain",
        "Poll not found, try again later!"
      );
    });
  });
});
