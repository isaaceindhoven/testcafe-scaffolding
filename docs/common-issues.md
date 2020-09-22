[Home](../README.md)

# Common issues

#### Test won't run because of JavaScript errors on the pages I want to test

By default, Testcafé will fail a test if the page it wants to test throws error in the console. You can ignore this by running your test suite with the `skipJsErrors` option on `true`, although a better solution would be of course to fix the JavaScript errors thrown in the console.

```js
const testcafe = await createTestCafe()
const runner = testcafe.createRunner()

await runner
    // ... Other runner configuration ...
    .run({
        skipJsErrors: true
    })
```

More information available at the [TestCafé documentation](https://devexpress.github.io/testcafe/documentation/using-testcafe/programming-interface/runner.html#run)
