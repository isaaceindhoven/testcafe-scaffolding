import { Selector } from 'testcafe'

class GoogleResultsPage {
    constructor() {
        this.firstResultLink = Selector('#rso a').nth(0)
    }

    getFirstLinkHref() {
        return this.firstResultLink.getAttribute('href')
    }
}

export default new GoogleResultsPage();