/// <reference types="cypress" />

context("Home", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });
    it("should find home", () => {
        cy.get("div")
    });
})