/// <reference types="cypress"/>

import { onTopNavigation } from "../../../../support/page-objects/TopNavigationBar/TopNav"
import { onUserListPage } from "../../../../support/page-objects/UserManagement/UserList/UserListPage"
import { navigateTo } from "../../../../support/page-objects/Utilities/SideMenu"
import { tc_search_user } from "../../../../fixtures/UserManagement/searchUser.json"

describe("Search User Member Many Scenarios", () => {

    before('log in to the app', () => {
        cy.loginToApplication()
        onTopNavigation.getUserProfile()
    })

    beforeEach('navigate to User Management page', () => {
        navigateTo.userListPage()
        onUserListPage.verifyPageLoaded()
    })

    tc_search_user.forEach((item) => {
        it(`${item.testCaseNo} - ${item.testCaseName}`, () => {
            onUserListPage.searchUserMember(item)
            onUserListPage.clickOnSearchButton()
            onUserListPage.verifySearchResults(item)
        })
    })

})