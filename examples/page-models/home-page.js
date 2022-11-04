import { Selector } from "testcafe";

export const HomePage = () => {
    return {
        homeURL: "https://www.iodigital.com/nl",
        logo: Selector('[aria-label="Io logo"]'),
    };
};
