import { Selector } from "testcafe";

export const AboutPage = () => {
    return {
        aboutUrl: "https://www.iodigital.com/nl/over-ons",
        logo: Selector('[aria-label="Io logo"]'),
    };
};
