import { Selector, t } from "testcafe";

export const CookieWall = () => {
    const selectors = {
        submitCookies: Selector('#onetrust-accept-btn-handler')
    }
    return {
        ...selectors,
        acceptCookies: async () => {
            await t.click(selectors.submitCookies)
        }
    };
};
