import faker from "faker";

const baseUrl: string = Cypress.config().baseUrl;
describe("login", () => {
  beforeEach(() => {
    cy.visit("login");
  });
  it("Should load with correct initial state", () => {
    cy.get(`[data-testid=email-status]`)
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴");
    cy.get(`[data-testid=password-status]`)
      .should("have.attr", "title", "Campo obrigatório")
      .should("contain.text", "🔴");
    cy.get(`[data-testid=submit]`).should("have.attr", "disabled");
    cy.get(`[data-testid=error-wrap]`).should("not.have.descendants");
  });

  it("Should present error state if form is invalid", () => {
    cy.get(`[data-testid=email]`).type(faker.random.word());
    cy.get(`[data-testid=email-status]`)
      .should("have.attr", "title", "Valor inválido")
      .should("contain.text", "🔴");
    cy.get(`[data-testid=password]`).type(faker.random.alphaNumeric(3));
    cy.get(`[data-testid=password-status]`)
      .should("have.attr", "title", "Valor inválido")
      .should("contain.text", "🔴");
    cy.get(`[data-testid=submit]`).should("have.attr", "disabled");
    cy.get(`[data-testid=error-wrap]`).should("not.have.descendants");
  });

  it("Should present error state if form is invalid", () => {
    cy.get(`[data-testid=email]`).type(faker.internet.email());
    cy.get(`[data-testid=email-status]`)
      .should("have.attr", "title", "Tudo certo!")
      .should("contain.text", "🟢");
    cy.get(`[data-testid=password]`).type(faker.random.alphaNumeric(5));
    cy.get(`[data-testid=password-status]`)
      .should("have.attr", "title", "Tudo certo!")
      .should("contain.text", "🟢");
    cy.get(`[data-testid=submit]`).should("not.have.attr", "disabled");
    cy.get(`[data-testid=error-wrap]`).should("not.have.descendants");
  });

  it("Should present error if invalid credentials are provided", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: {
        error: faker.random.words(),
      },
    });
    cy.get(`[data-testid=email`).type(faker.internet.email());
    cy.get(`[data-testid=password`)
      .type(faker.random.alphaNumeric(5))
      .type("{enter}");
    // cy.get(`[data-testid=submit").click();
    cy.get(`[data-testid=error-wrap]`)
      .get(`[data-testid=spinner]`)
      .should("not.exist")
      .get(`[data-testid=main-error]`)
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
    cy.get(`[data-testid=email]`).type("mango@gmail.com");
    cy.get(`[data-testid=password]`).type("12345");
    cy.get(`[data-testid=submit]`).click();
    cy.url().should("eq", `${baseUrl}/`);
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem("account"))
    );
  });

  it("Should prevent multiple submits", () => {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      body: {
        accessToken: faker.random.words(),
      },
    }).as("request");
    cy.get(`[data-testid=email]`).type("mango@gmail.com");
    cy.get(`[data-testid=password]`).type("12345");
    cy.get(`[data-testid=submit]`).dblclick();
    // cy.get("@request.all").should("have.length", 1);
  });
});
