#!/usr/bin/env node
/* eslint-disable no-console, no-template-curly-in-string */

/**
 * TestCafé Runner with BrowserStack
 *
 * Not enough browsers on your local machine? On a Windows and want to test in Safari?
 * No worries, BrowserStack has you covered.
 *
 * Write your tests, run them in a Browserstack browser of your choice
 * and automatically generate screenshots on a test failure. Afterwards the videos of
 * the ran tests are available on BrowserStack.
 *
 * Documentation: https://github.com/isaaceindhoven/testcafe-scaffolding#readme
 * Browserlist: https://www.browserstack.com/list-of-browsers-and-platforms
 *
 */

const createTestCafe = require('testcafe');

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
        // Use .browsers('chrome') if you don't want to run against browserstack. (chrome:headless for headless chrome)
        .screenshots(
            'tests/e2e/screenshots',
            true,
            '${DATE}_${TIME}/test-${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png',
        )
        .concurrency(1) // Make it more than 1 to run tests in parallel
        .run()

    console.error(`TestCafé failed tests: ${failedCount}`)
    testcafe.close()
})()
