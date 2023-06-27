

export class UserListPage{

    /**
     * Get an element locator on this page
     * @returns locator path
     */
    getUserListTitle(){
        return cy.get('div.page-header').find('h3')
    }

    getAddNewUserLink(){
        return cy.get('#create_new')
    }

    getUserNameTextbox(){
        return cy.get('[name="filter[username]"]')
    }

    getFullNameTextbox(){
        return cy.get('[name="filter[full_name]"]')
    }

    getRoleDropdownList(){
        return cy.get('[name="filter[role_id]"]')
    }

    getStatusDropdownList(){
        return cy.get('[name="filter[status]"]')
    }

    getFromDateTextbox(){
        return cy.get('[name="filter[update_date][from]"]')
    }

    getToDateTextbox(){
        return cy.get('[name="filter[update_date][to]"]')
    }

    getMonthTitle(){
        return cy.get('[class="datepicker -bottom-left- -from-bottom- active"]').find('.datepicker--nav-title')
    }

    getPreviousButton(){
        return cy.get('[class="datepicker -bottom-left- -from-bottom- active"]').find('[data-action="prev"]')
    }

    getYearInCalendar(){
        return cy.get('[class="datepicker--years datepicker--body active"]')
    }

    getMonthInCalendar(){
        return cy.get('[class="datepicker--months datepicker--body active"]')
    }

    getDateInCalendar(){
        return cy.get('[class="datepicker--days datepicker--body active"]')
    }

    getNextButton(){
        return cy.get('[class="datepicker -bottom-left- -from-bottom- active"]').find('[data-action="next"]')
    }

    getSearchButton(){
        return cy.contains('button', 'Search')
    }

    getResetButton(){
        return cy.contains('button', 'Reset')
    }

    getEditButton(userName){
        return cy.get('tbody').contains('tr', userName).then( tableRow => {
            cy.wrap(tableRow).find('.icon-pencil')
        })
    }

    getDeleteButton(userName){
        return cy.get('tbody').contains('tr', userName).then( tableRow => {
            cy.wrap(tableRow).find('.icon-trash')
        })
    }

    getHeaderOnRemoveDialogBox(){
        return cy.get('[role="dialog"]').find('.swal-text')
    }

    getConfirmButtonForRemoveDialogBox(){
        return cy.get('div.swal-button-container').find('button').contains('Confirm')
    }

    getCancleButtonForRemoveDialogBox(){
        return cy.get('div.swal-button-container').find('button').contains('Cancel')
    }

    getAlertMessage(){
        return cy.get('div[data-notify="container"][role="alert"]').find('[data-notify="message"]')
    }

    /**
     * Verifications
     */
    verifyPageLoaded(){
        this.getUserListTitle().should('contain', 'User Management').and('be.visible')
    }

    verifyAlertMessage(){
        this.getAlertMessage().should('contain', 'Data has been saved successfully').and('be.visible')
    }

    verifyDataShouldExist(search_term){
        cy.get('tbody tr').then( tableRow => {
            cy.wrap(tableRow).find('td').should('contain', search_term).and('be.visible')
        })
    }

    verifyDataShouldNotExist(){
        cy.wait(500)
        cy.get('tbody tr').then( tableRow => {
            cy.wrap(tableRow).find('td').should('contain', 'No matching records found')
        })
    }

    verifySearchResults(search_term){
        cy.wait(500)
        if(search_term.caseType == 'positive'){
            cy.get('tbody tr').find('td').then (tableColumns => {
                if(search_term.userName != ""){
                    cy.wrap(tableColumns).eq(1).should('contain', search_term.userName)
                }
                if(search_term.roleUser != ""){
                    cy.get('tbody tr').each( tableRow => {
                        cy.wrap(tableRow).find('td').eq(3).should('contain', search_term.roleUser)
                    })
                }
                if(search_term.statusUser != ""){
                    cy.get('tbody tr').each( tableRow => {
                        cy.wrap(tableRow).find('td').eq(4).should('contain', search_term.statusUser)
                    })
                }
                // กรณีพบข้อมูล
                cy.get('tbody tr').then( tableRow => {
                    cy.wrap(tableRow).find('td').should('not.have.text', 'No matching records found')
                })
                cy.get('#datatable_list_info').then(message => {
                    expect(message).to.not.contain('Showing 0 to 0')
                })
            })
        // กรณีไม่พบข้อมูล    
        } else if(search_term.caseType == 'negative'){
            cy.get('tbody tr').then( tableRow => {
                cy.wrap(tableRow).find('td').should('have.text', 'No matching records found')
            })
            cy.get('#datatable_list_info').then(message => {
                expect(message).to.contain('Showing 0 to 0')
            })
        }
        
    }

    /**
     * Actions
     */
    searchUserByUserName(userName){
        if(userName != ""){
            this.getUserNameTextbox().type(userName)
        }
    }

    searchUserByRole(role){
        if(role != ""){
            this.getRoleDropdownList().select(role,{force: true})
        }
    }

    searchUserByStatus(status){
        if(status != ""){
            this.getStatusDropdownList().select(status,{force: true})
        }
    }

    searchUserByFromDate(date_string){
        if(date_string != ""){
            this.getFromDateTextbox().then( input=> {
                cy.wrap(input).click()
                this.getMonthTitle().click()
                this.getMonthTitle().click()
                let dateAssert = this.selectDate(date_string)
                cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
            })
        }
    }

    searchUserByToDate(date_string){
        if(date_string != ""){
            this.getToDateTextbox().then( input=> {
                cy.wrap(input).click()
                this.getMonthTitle().click()
                this.getMonthTitle().click()
                let dateAssert = this.selectDate(date_string)
                cy.wrap(input).invoke('prop','value').should('contain',dateAssert)
            })
        }
    }

    searchUserMember(search_term){
        this.searchUserByUserName(search_term.userName)
        this.searchUserByRole(search_term.roleUser)
        this.searchUserByStatus(search_term.statusUser)
        this.searchUserByFromDate(search_term.updatedDateFrom)
        this.searchUserByToDate(search_term.updatedDateTo)
    }

    clearSearchTerm(){
        this.clickOnResetButton()
    }

    clickOnSearchButton(){
        this.getSearchButton().click()
    }

    clickOnResetButton(){
        this.getResetButton().click()
        this.getUserNameTextbox().should('be.empty')
        this.getFullNameTextbox().should('be.empty')
        this.getRoleDropdownList().should('contain','All')
        this.getStatusDropdownList().should('contain','All')
    }

    clickOnAddNewUserLink(){
        this.getAddNewUserLink().click()
    }

    clickOnConfirmButtonToRemove(){
        this.getConfirmButtonForRemoveDialogBox().click()
    }

    clickOnCancelButtonToNotRemove(){
        this.getCancleButtonForRemoveDialogBox().click()
    }

    selectUserToEdit(userName){
        cy.wait(500)
        this.getEditButton(userName).click()
    }

    /**
     * User Management - Delete Function
     * @param {*} userName 
     */

    selectUserToRemove(userName){
        cy.wait(500)
        this.getDeleteButton(userName).click()
        this.getHeaderOnRemoveDialogBox().should('contain', 'Are you sure you want to delete this?').and('be.visible')
    }

    removeForSearchedUser(userName){
        this.selectUserToRemove(userName)
        this.clickOnConfirmButtonToRemove()
        this.verifyAlertMessage()
        this.verifyDataShouldNotExist()
    }

    cancelForSearchedUserToRemove(userName){
        this.selectUserToRemove(userName)
        this.clickOnCancelButtonToNotRemove()
        this.verifyDataShouldExist(userName)
    }

    /**
     * Logic
     */
    selectDate(date_string){
        let today = new Date()
        today.setDate(today.getDate())
        var [year, month, day] = date_string.split('-')
        month = month-1
        var year_diff = year-today.getFullYear()
        let move = Math.floor(year_diff/10)

        // Moving controller
        var shiftForward = null
        if(move == 0) shiftForward = 2; // No need to move
        else if(move > 0) shiftForward = 1; // Move forward
        else if (move < 0) shiftForward = 0; // Move backward
    
        // Count of hits to move forward/backward
        if(move > 0) move = move;
        else if(move < 0) move = move*-1;
        else if (move == 0) move = 0;
    
        if(shiftForward != 2){
            for(let i=0; i < move; i++){
                if(shiftForward == 0){
                    this.getPreviousButton().click()
                } else if(shiftForward == 1){
                    this.getNextButton().click()
                }
            }
        }

        this.getYearInCalendar().find('[data-year="'+year+'"]').click()
        this.getMonthInCalendar().find('[data-month="'+month+'"]').click()
        this.getDateInCalendar().find('[data-date="'+day+'"][data-month="'+month+'"][data-year="'+year+'"]').click()
        month = month+1
        month = month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        let dateAssert = year+'-'+month+'-'+day
        return dateAssert
    }

}

export const onUserListPage =  new UserListPage()