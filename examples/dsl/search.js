/* eslint-disable class-methods-use-this */
import { t } from 'testcafe'
import googleHomePage from '../page-models/google-home'

class Search {
    async enterSearchQuery(query) {
        await t
            .typeText(googleHomePage.searchQueryInput, query)
            .pressKey('enter')
    }
}

export default new Search();
