import { ClientFunction } from 'testcafe'

class Browser {
    constructor() {
        this.getUrl = ClientFunction(() => document.location.href)
    }
}

export default new Browser();
