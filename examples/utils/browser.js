import { ClientFunction } from "testcafe";

export const Browser = () => {
    return {
        getUrl: ClientFunction(() => document.location.href),
    };
};
