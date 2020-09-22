/* eslint-disable class-methods-use-this */
import googleResultsPage from '../page-models/google-results'

class Results {
    getFirstLinkHref() {
        return googleResultsPage.getFirstLinkHref()
    }
}

export default new Results()
