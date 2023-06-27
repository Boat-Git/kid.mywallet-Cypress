function selectGroupMenuItem(groupName){
    cy.contains('a', groupName).then(menu => {
        cy.wrap(menu).find('.according-menu i').invoke('attr', 'class').then( attr => {
            if(attr.includes('right')){
                cy.wrap(menu).click()
            }
        })
    })
}

export class SideMenu{

    memberListPage(){
        selectGroupMenuItem('Member Management')
        cy.contains('Member List').click()
    }

    memberGroupPage(){
        selectGroupMenuItem('Member Management')
        cy.contains('Member Group').click()
    }

    userListPage(){
        selectGroupMenuItem('User Management')
        cy.contains('User List').click()
    }

    userRolePage(){
        selectGroupMenuItem('User Management')
        cy.contains('Role Permission').click()
    }

    eventManagementPage(){
        cy.contains('Event Management').click()
    }

    announceManagementPage(){
        cy.contains('Announce Management').click()
    }

    notificationManagementPage(){
        cy.contains('Notification Management').click()
    }

    musuemInformationPage(){
        cy.contains('Museum Infomation').click()
    }

    digitalCardSummary(){
        selectGroupMenuItem('Report')
        cy.contains('Digital Card Summary').click()
    }

    digitalCardStatus(){
        selectGroupMenuItem('Report')
        cy.contains('Digital Card Status').click()
    }

    userPassActivityLogs(){
        selectGroupMenuItem('Report')
        cy.contains('User Pass Activity Logs').click()
    }

    homePage(){
        cy.get('[data-href="welcome"]').click()
    }

}

export const navigateTo = new SideMenu()