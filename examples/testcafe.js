#!/usr/bin/env node
/* eslint-disable no-console, no-template-curly-in-string */

/**
 * TestCafé Runner: Default
 *
 * Let's start of simple.
 * Write your tests in 'tests/e2e/tests/', run them in Chrome
 * and automatically generate screenshots on a test failure.
 *
 * Documentation:https://github.com/isaaceindhoven/testcafe-scaffolding#readme
 *
 */

const createTestCafe = require('testcafe');

(async () => {
    const testcafe = await createTestCafe()
    const runner = testcafe.createRunner()

    const failedCount = await runner
        .src('tests/e2e/tests/**/*.js')
        .browsers('chrome') // Use chrome:headless if you don't want the actual browser to show up on your screen and execute the test.
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
