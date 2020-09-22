#!/usr/bin/env node
/* eslint-disable no-console, no-template-curly-in-string */

/**
$ * TestCafé Runner with BrowserStack
 *
 * This runner contains both Allure reporting and Browserstack integration.
 *
 * Output Allure results in allure/allure-results
 * and let Jenkins generate reports in HTML.
 *
 * Write your tests, run them in a Browserstack browser of your choice
 * and automatically generate screenshots on a test failure. Afterwards the videos of
 * the ran tests are available on BrowserStack.
 *
 * Browserlist: https://www.browserstack.com/list-of-browsers-and-platforms
 * Documentation: https://github.com/isaaceindhoven/testcafe-scaffolding#readme
 *
 */
const createTestCafe = require('testcafe')
const { reporterConfig } = require('testcafe-reporter-allure/dist/utils');

(async () => {
    /* This check is used for browserstack only --------------- */
    if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
        console.error('Please include your BrowserStack credentials in your environment variables')
        process.exit(1)
    }
    /* This check is used for browserstack only --------------- */

    const testcafe = await createTestCafe()
    const runner = testcafe.createRunner()

    const failedCount = await runner
        .src('tests/e2e/tests/**/*.js')
        .browsers('browserstack:chrome')
        .reporter([
            { name: 'spec' },
            { name: 'allure' },
        ])
        .screenshots({
            path: reporterConfig.SCREENSHOT_DIR,
            takeOnFails: true,
        })
        .run({
            quarantineMode: reporterConfig.ENABLE_QUARANTINE,
            disableScreenshots: !reporterConfig.ENABLE_SCREENSHOTS,
        })

    console.error(`TestCafé failed tests: ${failedCount}`)
    testcafe.close()
})()
