import { t, Selector } from 'testcafe'

class GoogleHomePage {
    constructor() {
        this.url = 'https://www.google.com/'
        this.searchQueryInput = Selector('input[name="q"]')
    }

    async enterSearchQuery(query) {
        await t
            .typeText(this.searchQueryInput, query)
            .pressKey('enter')
    }
}

export default new GoogleHomePage();
