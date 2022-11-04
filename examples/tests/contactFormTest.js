/**
 * This example test fills in first name and last name and press send
 * Frontend validation should prevent an actual send
 */

import { ContactPage } from "../page-models/contact-page";
import { CookieWall } from "../page-models/cookie-wall";

fixture("iO Contact form").page(ContactPage().contactURL);

test.before(async () => {
    await CookieWall().acceptCookies();
})("Enter first and lastname on contact form and fail send", async (t) => {
    await t.typeText(ContactPage().firstNameInput, "firstName");
    await t.typeText(ContactPage().lastNameInput, "lastName");
    await t.click(ContactPage().submitButton);
    await t.expect(ContactPage().errorMessage.exists).ok();
});
