/// <reference types="cypress"/>

export class UserCreatePage{

    /**
     * Get an element locator on this page
     * @returns locator path
     */
    getUserListTitle(){
        return cy.get('div.page-header').find('h3')
    }

    getUserNameTextbox(){
        return cy.get('[name="username"]')
    }

    getPasswordTextbox(){
        return cy.get('[name="password"]')
    }

    getFullNameTextbox(){
        return cy.get('[name="full_name"]')
    }

    getRoleDropdownList(){
        return cy.get('[name="role_id"]')
    }

    getMobileTextbox(){
        return cy.get('[name="mobile"]')
    }

    getEmailTextbox(){
        return cy.get('[name="email"]')
    }

    getActiveRadioButton(){
        return cy.get('div[class="radio radio-primary m-t-10"]').find('input[id="status1"]')
    }

    getInActiveRadioButton(){
        return cy.get('div[class="radio radio-primary m-t-10"]').find('input[id="status2"]')
    }

    getSaveButton(){
        return cy.get('#save_from')
    }

    getCloseButton(){
        return cy.get('button').contains('Close')
    }

    getAlertMessage(){
        return cy.get('div[data-notify="container"][role="alert"]').find('[data-notify="title"]')
    }

    getEditPageTitle(){
        return cy.get('div.page-header').find('h3')
    }

    /**
     * Verifications
     */
    verifyPageLoaded(){
        this.getUserListTitle().should('contain','New User').and('be.visible')
    }

    verifyCreatedUserResults(user_info){
        if(user_info.caseType == 'positive'){
            this.verifyEditUserPageLoaded()
        } else if(user_info.caseType == 'negative'){
            if(user_info.expectedMessage != ""){
                this.getAlertMessage().should('contain', user_info.expectedMessage)
            }
            // verify required field(s)
            else{
                if(user_info.userName == ""){
                    this.getUserNameTextbox().should('have.css', 'border-color', 'rgb(220, 53, 69)')
                }
                if(user_info.fullName == ""){
                    this.getFullNameTextbox().should('have.css', 'border-color', 'rgb(220, 53, 69)')
                }
                if(user_info.roleUser == ""){
                    this.getRoleDropdownList().should('contain', 'Please Select Role Permission')
                }
            }
        }
    }

    verifyEditUserPageLoaded(){
        this.getEditPageTitle().should('contain', 'User ID:')
        // this.getUserNameTextbox().then( ($input) => {
        //     cy.wrap($input).invoke('val').then ((value) => {
        //         cy.wrap(value).should('contain', user_info.userName)
        //     })
        // })
        // cy.get('[class="form-control username"]').should('contain', user_info.userName)
        // this.getFullNameTextbox().should('contain', user_info.fullName)
        // this.getRoleDropdownList().should('contain', user_info.roleUser)
        // this.getMobileTextbox().should('contain', user_info.mobile)
        // this.getEmailTextbox().should('contain', user_info.email)
    }

    /**
     * Actions
     */
    createUserMember(user_info){
        if(user_info.userName != ""){
            this.getUserNameTextbox().clear().type(user_info.userName)
        }
        if(user_info.password != ""){
            this.getPasswordTextbox().clear().type(user_info.password)
        }
        if(user_info.fullName != ""){
            this.getFullNameTextbox().clear().type(user_info.fullName)
        }
        if(user_info.roleUser != ""){
            this.getRoleDropdownList().select(user_info.roleUser,{force: true})
        }
        if(user_info.mobile != ""){
            this.getMobileTextbox().clear().type(user_info.mobile)
        }
        if(user_info.email != ""){
            this.getEmailTextbox().clear().type(user_info.email)
        }
        if(user_info.statusUser != ""){
            if(user_info.statusUser == '0') this.getActiveRadioButton().check({force: true})
            else if(user_info.statusUser == '1') this.getInActiveRadioButton().check({force: true})
        }
    }

    editUserMember(user_info){
        this.clearAllFields(user_info)
        if(user_info.userName != ""){
            this.getUserNameTextbox().type(user_info.userName)
        }
        if(user_info.fullName != ""){
            this.getFullNameTextbox().type(user_info.fullName)
        }
        if(user_info.roleUser != ""){
            this.getRoleDropdownList().select(user_info.roleUser,{force: true})
        }
        if(user_info.mobile != ""){
            this.getMobileTextbox().type(user_info.mobile)
        }
        if(user_info.email != ""){
            this.getEmailTextbox().type(user_info.email)
        }
        if(user_info.statusUser != ""){
            if(user_info.statusUser == '0') this.getActiveRadioButton().check({force: true})
            else if(user_info.statusUser == '1') this.getInActiveRadioButton().check({force: true})
        }
    }

    clearAllFields(user_info){
        this.getUserNameTextbox().clear()
        this.getFullNameTextbox().clear()
        this.getRoleDropdownList().select(user_info.roleUser,{force: true})
        this.getMobileTextbox().clear()
        this.getEmailTextbox().clear()
    }

    clickOnSaveButton(){
        this.getSaveButton().click()
    }

    clickOnCloseButton(){
        this.getCloseButton().click()
    }
}

export const onUserCreatePage = new UserCreatePage()