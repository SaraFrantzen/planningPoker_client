describe("visitor can see all listed polls", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/polls",
      response: "fixture:polls.json",
    });

    cy.visit("/");
  });

  it("visitor can see poll title", () => {
    cy.get("[data-cy='poll-1']").within(() => {
      cy.get("[data-cy='title']").should(
        "contain",
        "API can provide polls index"
      );
    });
  });

  it("visitor can see poll description", () => {
    cy.get("[data-cy='poll-2']").within(() => {
      cy.get("[data-cy='description']").should(
        "contain",
        "As a visitor in order to see what polls there are"
      );
    });
  });
});
