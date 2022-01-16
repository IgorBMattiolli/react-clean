import faker from "faker";

const baseUrl: string = Cypress.config().baseUrl;

describe("Private Routes", () => {
  it("Should logout if survey-list has on token", () => {
    cy.visit("");
    cy.url().should("eq", `${baseUrl}/login`);
  });
});
