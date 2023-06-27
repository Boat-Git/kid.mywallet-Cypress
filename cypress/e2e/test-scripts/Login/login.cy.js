/// <reference types="cypress"/>

import { onTopNavigation } from "../../../support/page-objects/TopNavigationBar/TopNav"

describe('Login with many scenarios', () => {

    it('verify user should be able to login with valid credentials successfully', () => {
        cy.loginToApplication()
        onTopNavigation.getUserProfile()
    })

    it('verify user should be able to logout successfully', () => {
        cy.loginToApplication()
        onTopNavigation.goToLogout()
    })

})