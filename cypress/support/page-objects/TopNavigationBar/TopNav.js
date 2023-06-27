
export class TopNavigation{

    getUserProfile(){
        return cy.get('#username_cms').should('contain', Cypress.env("username"))
    }

    goToMyAccout(){
        this.getUserProfile().click()
        cy.get('ul').contains('My Account').click()
    }

    goToLogout(){
        this.getUserProfile().click()
        cy.get('ul').contains('Log out').click()
    }

}

export const onTopNavigation =  new TopNavigation()