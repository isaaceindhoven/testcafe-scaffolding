/**
 * This example test checks whether the ISAAC homepage is listed
 * as first search result when typing 'isaac' as search query.
 * This test fails when the ISAAC homepage is not listed as first search result.
 */

import googleHomePage from '../page-models/google-home'
import googleResultsPage from '../page-models/google-results'
import isaacHomePage from '../page-models/isaac-website'

fixture('ISAAC Google ranking')
    .page(googleHomePage.url)

test('ISAAC is at #1 at Google for the search term \'isaac\'', async (t) => {
    await googleHomePage.enterSearchQuery('isaac')
    await t.expect(googleResultsPage.getFirstLinkHref())
        .eql(isaacHomePage.home)
})
