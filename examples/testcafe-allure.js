#!/usr/bin/env node
/* eslint-disable no-console, no-template-curly-in-string */

/**
 * TestCafé Runner with Allure
 *
 * Write your tests in 'tests/e2e/tests/', run them in Chrome
 * and automatically generate screenshots on a test failure.
 * Output Allure results in allure/allure-results
 * and let Jenkins generate reports in HTML.
 *
 * Documentation: https://github.com/isaaceindhoven/testcafe-scaffolding#readme
 *
 */

const createTestCafe = require('testcafe')
const { reporterConfig } = require('testcafe-reporter-allure/dist/utils');

(async () => {
    const testcafe = await createTestCafe()
    const runner = testcafe.createRunner()

    const failedCount = await runner
        .src('tests/e2e/tests/**/*.js')
        .browsers('chrome') // Use chrome:headless if you don't want the actual browser to show up on your screen and execute the test.
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
