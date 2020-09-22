import { Selector } from 'testcafe'

class IsaacWebsitePage {
    constructor() {
        this.home = 'https://www.isaac.nl/'
        this.about = 'https://www.isaac.nl/over-ons/'
        this.logo = Selector('[data-testid="logo"')
        this.logoInverse = Selector('[data-testid="logo-inverse"')
    }
}

export default new IsaacWebsitePage();