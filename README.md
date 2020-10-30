# TestCafé scaffolding tool

This project aims to simplify and standardize the installation and configuration of automated browser tests using TestCafé for various projects. This will hopefully lower the threshold to start with browser testing in projects.

## Installation

_Note: these installation instructions assume you already have a `package.json` present in the root of your project. If you do not have this, run `npm init` or `yarn init` and follow the instructions on screen._

1. Next, run the initialization script `npx @isaac.frontend/testcafe-scaffolding` follow the on-screen instructions. This will install the proper dependencies and setup a directory structure in your project.
2. To run your test suite locally, run: `npm run test:e2e` or `yarn test:e2e`

The latest version of the following dependencies will be installed, depending on the features you want:
- [testcafe](https://www.npmjs.com/package/testcafe)
- [testcafe-browser-provider-browserstack](https://www.npmjs.com/package/testcafe-browser-provider-browserstack)
- [testcafe-reporter-allure](https://www.npmjs.com/package/@isaac.frontend/testcafe-reporter-allure)

Also, we'll install a `runner.js` in `tests/e2e` where we call the [TestCafé programmatic runner](https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html).

## Table of Contents
* [Writing the test suite](docs/writing-the-testsuite.md)
    * [Directory structure](docs/writing-the-testsuite.md#directory-structure)
    * [Architecture](docs/writing-the-testsuite.md#architecture)
    * [Used language](docs/writing-the-testsuite.md#used-language)
    * [Semantics](docs/writing-the-testsuite.md#semantics)
    * [Utilities](docs/writing-the-testsuite.md#utilities)
        * [Browser Utility](docs/utilities/browser.md)
* [Running the test suite](docs/running-the-testsuite.md)
    * [Running locally](docs/running-the-testsuite.md#running-locally)
    * [Running on BrowserStack](docs/running-the-testsuite.md#running-on-browserstack)
* [Allure integration](docs/allure.md)
* [Common issues](docs/common-issues.md)

## License
[MIT](https://github.com/isaaceindhoven/testcafe-scaffolding/blob/master/LICENSE) © ISAAC E-commerce Solutions BV
