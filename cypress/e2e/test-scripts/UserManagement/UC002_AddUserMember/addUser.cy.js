/// <reference types="cypress"/>

import { onTopNavigation } from "../../../../support/page-objects/TopNavigationBar/TopNav"
import { onUserListPage } from "../../../../support/page-objects/UserManagement/UserList/UserListPage"
import { onUserCreatePage } from "../../../../support/page-objects/UserManagement/UserMember/userCreatePage"
import { navigateTo } from "../../../../support/page-objects/Utilities/SideMenu"
import { tc_create_user } from "../../../../fixtures/UserManagement/createUser.json"

describe("Create User Member Many Scenarios", () => {
    before('log in to the app', () => {
        cy.loginToApplication()
        onTopNavigation.getUserProfile()
        navigateTo.userListPage()
        onUserListPage.verifyPageLoaded()
    })

    beforeEach('navigate to User Create page', () => {
        onUserListPage.clickOnAddNewUserLink()
        onUserCreatePage.verifyPageLoaded()
    })

    // it.only('test add', () => {
    //     const user_info = {
    //         "userName": "Add_Cypess_001",
    //         "password": "123456",
    //         "fullName": "Mr.Cypress",
    //         "roleUser": "Admin",
    //         "mobile": "081-123-4567",
    //         "email": "Cypress_Test01@Cy.com",
    //         "statusUser": "0",
    //         "expectedMessage": "Data has been saved successfully",
    //         "caseType": "positive"
    //     }
    //     onUserCreatePage.createUserMember(user_info)
    //     onUserCreatePage.clickOnSaveButton()
    //     onUserCreatePage.verifyCreatedUserResults(user_info)
    // })

    tc_create_user.forEach((item) => {
        it(`${item.testCaseNo} - ${item.testCaseName}`, () => {
            onUserCreatePage.createUserMember(item)
            onUserCreatePage.clickOnSaveButton()
            onUserCreatePage.verifyCreatedUserResults(item)
        })
    })

    afterEach('navigate back to User List Page', () => {
        onUserCreatePage.clickOnCloseButton()
    })
})