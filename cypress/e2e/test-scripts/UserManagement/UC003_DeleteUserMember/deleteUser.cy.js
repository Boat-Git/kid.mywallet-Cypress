/// <reference types="cypress"/>

import { onTopNavigation } from "../../../../support/page-objects/TopNavigationBar/TopNav"
import { onUserListPage } from "../../../../support/page-objects/UserManagement/UserList/UserListPage"
import { onUserCreatePage } from "../../../../support/page-objects/UserManagement/UserMember/userCreatePage"
import { navigateTo } from "../../../../support/page-objects/Utilities/SideMenu"
import { faker } from '@faker-js/faker'

describe("Delete User Member", () => {

    // prepare data before testing
    var USER_INFO = {
        "user_info": [
            {
                userName: faker.word.sample()+'_'+faker.number.int({ max: 1000 }),
                password: '123456',
                fullName: faker.person.fullName(),
                roleUser: 'ดูอย่างเดียว',
                mobile: '',
                email: '',
                status: ''
            },
            {
                userName: faker.word.sample()+'_'+faker.number.int({ max: 1000 }),
                password: '123456',
                fullName: faker.person.fullName(),
                roleUser: 'ดูอย่างเดียว',
                mobile: '',
                email: '',
                status: ''
            }
        ]
    }
    let INDEX = 0

    before('log in to the app and navigate to User List page', () => {
        cy.loginToApplication()
        onTopNavigation.getUserProfile()
        navigateTo.userListPage()
        onUserListPage.verifyPageLoaded()
    })

    beforeEach('Create a new user member', () => {
        onUserListPage.clickOnAddNewUserLink()
        onUserCreatePage.verifyPageLoaded()
        onUserCreatePage.createUserMember(USER_INFO.user_info[INDEX]);INDEX=INDEX+1;
        onUserCreatePage.clickOnSaveButton()
        onUserCreatePage.verifyEditUserPageLoaded()
        onUserCreatePage.clickOnCloseButton()
    })
    
    it('should be able to delete user', () => {
        onUserListPage.searchUserByUserName(USER_INFO.user_info[0].userName)
        onUserListPage.clickOnSearchButton()
        onUserListPage.removeForSearchedUser(USER_INFO.user_info[0].userName)
    })

    it('should be able to cancel to delete user', () => {
        onUserListPage.searchUserByUserName(USER_INFO.user_info[1].userName)
        onUserListPage.clickOnSearchButton()
        onUserListPage.cancelForSearchedUserToRemove(USER_INFO.user_info[1].userName)
    })

    afterEach('Clear Search Term', () => {
        onUserListPage.clearSearchTerm()
    })
})


// copy & paste below command to execute test with headless mode
// npx cypress run --spec 'cypress/e2e/test-scripts/UserManagement/UC003_DeleteUserMember/deleteUser.cy.js'