import { Selector } from 'testcafe'

class GoogleHomePage {
    constructor() {
        this.url = 'https://www.google.com/'
        this.searchQueryInput = Selector('input[name="q"]')
    }
}

export default new GoogleHomePage();