[Home](../README.md)

# Running the test suite

There are various ways to run your test suite:

## Running locally

The initializer script will install a basic runner at `tests/e2e/runner.js` and add a `test:e2e` script to your `package.json`. To start the script, run `npm run test:e2e` or `yarn test:e2e` in the root of your project.

By default the Chrome browser is used and all the tests in your `tests`-folder are executed.

If you want to provide additional flags to TestCafé, run only a single testfile or change any of the options, feel free to change the runner functionality to suit your use cases.

## Running on BrowserStack

Test suites can also be run on [BrowserStack](https://www.browserstack.com/). BrowserStack has a list of [available browsers](https://www.browserstack.com/list-of-browsers-and-platforms/) you can choose from.

**Requirements:**
- BrowserStack account with "Automate" possibilities.
- The URL of your project should be accessible from the BrowserStack servers.
- WIP - BrowserStack Proxy - Proxy a locally hosted project to BrowserStack
  - https://github.com/DevExpress/testcafe-browser-provider-browserstack#browserstack-proxy-options
  - https://www.browserstack.com/local-testing/automate

To run your test suite on BrowserStack, the following environment variables should be available: `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`

When the test suite is complete, a URL is returned to show you the test results.

<table>
    <thead>
        <tr>
            <th>Environment variables</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                Don't know how to set environment variables in a JavaScript project? The following tools might provide you with a solution:
                <ul>
                    <li><a href="https://github.com/kentcdodds/cross-env">cross-env</a>: Cross platform setting of environment scripts.</li>
                    <li><a href="https://github.com/motdotla/dotenv">dotenv</a>: Loads environment variables from .env for nodejs projects.</li>
                    <li><a href="https://github.com/entropitor/dotenv-cli">dotenv-cli</a>: Load dotenv files in your CLI.</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Running it from CI

If you have problems running the test suite from CI (like Jenkins for example), try setting the `BROWSERSTACK_PARALLEL_RUNS` and/or the `BROWSERSTACK_USE_AUTOMATE` environment variable to `1`.
([related issue](https://github.com/DevExpress/testcafe-browser-provider-browserstack/issues/27)).

### Test on a different Browser / OS / Device

By default, only the Chrome browser is tested on BrowserStack. A list of available browsers is available on the [BrowserStack website](https://www.browserstack.com/list-of-browsers-and-platforms/js_testing).
