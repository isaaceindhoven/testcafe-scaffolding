/**
 * This example test checks whether clicking the ISAAC logo navigates to the homepage.
 * Note that this test may fail when the ISAAC homepage changes.
 */

import browser from '../utils/browser'
import isaacHomePage from '../page-models/isaac-website'

fixture('ISAAC website logo')
    .page(isaacHomePage.home)

test('Logo existence', async (t) => {
    await t
        .expect(isaacHomePage.logo.exists).eql(true)
})

test('Clicking the logo navigates to home', async (t) => {
    await t
        .navigateTo(isaacHomePage.about)
        .click(isaacHomePage.logo)
        .expect(browser.getUrl()).eql(isaacHomePage.home)
})
