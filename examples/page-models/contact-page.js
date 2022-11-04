import { Selector } from "testcafe";

export const ContactPage = () => {
    return {
        contactURL: "https://www.iodigital.com/nl/contact",
        firstNameInput: Selector("#firstname"),
        lastNameInput: Selector("#lastname"),
        submitButton: Selector('[type="submit"]'),
        errorMessage: Selector('.error-message')
    };
};
