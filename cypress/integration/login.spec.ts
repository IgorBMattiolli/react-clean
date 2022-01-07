import faker from "faker";

const baseUrl: string = Cypress.config().baseUrl;
describe("login", () => {
  beforeEach(() => {
    cy.visit("login");
  });
  it("Should load with correct initial state", () => {
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴");
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴");
    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("email").type(faker.random.word());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Valor inválido")
      .should("contain.text", "🔴");
    cy.getByTestId("password").type(faker.random.alphaNumeric(3));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Valor inválido")
      .should("contain.text", "🔴");
    cy.getByTestId("submit").should("have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present error state if form is invalid", () => {
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("email-status")
      .should("have.attr", "title", "Tudo certo!")
      .should("contain.text", "🟢");
    cy.getByTestId("password").type(faker.random.alphaNumeric(5));
    cy.getByTestId("password-status")
      .should("have.attr", "title", "Tudo certo!")
      .should("contain.text", "🟢");
    cy.getByTestId("submit").should("not.have.attr", "disabled");
    cy.getByTestId("error-wrap").should("not.have.descendants");
  });

  it("Should present error if invalid credentials are provided", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: {
        error: faker.random.words(),
      },
    });
    cy.getByTestId("email").type(faker.internet.email());
    cy.getByTestId("password")
      .type(faker.random.alphaNumeric(5))
      .type("{enter}");
    // cy.getByTestId("submit").click();
    cy.getByTestId("error-wrap")
      .getByTestId("spinner")
      .should("not.exist")
      .getByTestId("main-error")
      .should("exist")
      .should("contain.text", "Credenciais inválidas");
    cy.url().should("eq", `${baseUrl}/login`);
  });

  it("Should present save AccessToken if valid credentials are provided", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: {
        accessToken: faker.random.words(),
      },
    });
    cy.getByTestId("email").type("mango@gmail.com");
    cy.getByTestId("password").type("12345");
    cy.getByTestId("submit").click();
    cy.getByTestId("error-wrap")
      .getByTestId("spinner")
      .should("not.exist")
      .getByTestId("main-error")
      .should("not.exist");
    cy.url().should("eq", `${baseUrl}/`);
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem("accessToken"))
    );
  });

  it("Should prevent multiple submits", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: {
        accessToken: faker.random.words(),
      },
    }).as("request");
    cy.getByTestId("email").type("mango@gmail.com");
    cy.getByTestId("password").type("12345");
    cy.getByTestId("submit").dblclick();
    // cy.get("@request.all").should("have.length", 1);
  });
});
