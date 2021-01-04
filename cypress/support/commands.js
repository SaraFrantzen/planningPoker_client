import "cypress-file-upload";

Cypress.Commands.add("file_upload", (file, element, type) => {
  const selector = element;
  const fixturePath = file;
  cy.get(selector).then((subject) =>
    cy.window().then((win) =>
      cy
        .fixture(fixturePath, "base64")
        .then(Cypress.Blob.base64StringToBlob)
        .then((blob) => {
          const el = subject[0];
          const testFile = new win.File([blob], name, { type });
          const dataTransfer = new win.DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          cy.wrap(subject).trigger("change", { force: true });
        })
    )
  );
});

Cypress.Commands.add("login", () => {
  cy.server();
  cy.route({
    method: "POST",
    url: "http://localhost:3000/api/auth/*",
    response: `fixture:successful_login.json`,
    headers: {
      uid: `user@epidemic.com`,
    },
  });

  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/polls",
    response: "fixture:polls.json",
  });

  cy.route({
    method: "GET",
    url: "http://localhost:3000/api/auth/*",
    response: `fixture:successful_login.json`,
    headers: {
      uid: `user@epidemic.com`,
    },
  });
	cy.visit("/");
	cy.get('[data-cy="login"]').click();
  cy.get("[data-cy='login-form']").within(() => {
    cy.get("[data-cy='email']").type("user@epidemic.com");
    cy.get("[data-cy='password']").type("password");
    cy.get("[data-cy='submit']").click();
  });
});
