/// <reference types="cypress"/>

import { onTopNavigation } from "../../../../support/page-objects/TopNavigationBar/TopNav"
import { onUserListPage } from "../../../../support/page-objects/UserManagement/UserList/UserListPage"
import { onUserCreatePage } from "../../../../support/page-objects/UserManagement/UserMember/userCreatePage"
import { navigateTo } from "../../../../support/page-objects/Utilities/SideMenu"
import { tc_edit_user } from "../../../../fixtures/UserManagement/editUser.json"
import { faker } from '@faker-js/faker'

describe("Edit User Member Many Scenarios", () => {

    // prepare data before testing
    var USER_INFO = {
        userName: '',
        password: '123456',
        fullName: '',
        roleUser: 'Uat พนักงาน',
        mobile: '',
        email: '',
        status: '1'
    }

    before('log in to the app and navigate to User List page', () => {
        cy.loginToApplication()
        onTopNavigation.getUserProfile()
        navigateTo.userListPage()
        onUserListPage.verifyPageLoaded()
    })

    beforeEach('Create a new user member', () => {
        // set data to prevent duplicated username and more various data
        USER_INFO.userName = faker.word.sample()+'_'+faker.number.int({ max: 1000 })
        USER_INFO.fullName = faker.person.fullName()
        USER_INFO.mobile = faker.phone.number('08#-###-####')
        USER_INFO.email = faker.internet.email()

        // create a new user
        onUserListPage.clickOnAddNewUserLink()
        onUserCreatePage.verifyPageLoaded()
        onUserCreatePage.createUserMember(USER_INFO)
        onUserCreatePage.clickOnSaveButton()
        onUserCreatePage.verifyEditUserPageLoaded()
        onUserCreatePage.clickOnCloseButton()
        onUserListPage.verifyPageLoaded()
    })

    tc_edit_user.forEach((item) => {
        it(`${item.testCaseNo} - ${item.testCaseName}`, () => {
            onUserListPage.searchUserByUserName(USER_INFO.userName)
            onUserListPage.clickOnSearchButton()
            onUserListPage.selectUserToEdit(USER_INFO.userName)
            onUserCreatePage.verifyEditUserPageLoaded()
            onUserCreatePage.editUserMember(item)
            onUserCreatePage.clickOnSaveButton()
            onUserCreatePage.verifyCreatedUserResults(item)
        })
    })

    afterEach('navigate back to User List Page', () => {
        onUserCreatePage.clickOnCloseButton()
        onUserListPage.verifyPageLoaded()
    })
})