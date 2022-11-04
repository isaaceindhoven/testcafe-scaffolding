/**
 * This example test checks whether clicking the iO logo navigates to the homepage.
 * Note that this test may fail when the iO homepage changes.
 */

import { Browser } from "../utils/browser";
import { HomePage } from "../page-models/home-page";
import { AboutPage } from "../page-models/about-page";
import { CookieWall } from "../page-models/cookie-wall";

fixture("iO website logo").page(HomePage().homeURL);

test.before(async () => {
    await CookieWall().acceptCookies();
})("Logo existence", async (t) => {
    await t.expect(HomePage().logo.exists).eql(true);
});

test.before(async () => {
    await CookieWall().acceptCookies();
})("Clicking the logo navigates to home", async (t) => {
    await t
        .navigateTo(AboutPage().aboutUrl)
        .click(AboutPage().logo)
        .expect(Browser().getUrl())
        .eql(HomePage().homeURL);
});
