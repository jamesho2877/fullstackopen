describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3001");
  });

  it("Login form is shown", function () {
    cy.contains("Login to application");
    cy.title("Blog app - FullstackOpen 2022");
  });
});
