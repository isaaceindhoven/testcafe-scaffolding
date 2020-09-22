[Home](../../README.md) - [Writing the test suite](../writing-the-testsuite.md)

# Browser utilities

Declare your methods that get values from the browser here. These utilities are based upon TestCafé's [ClientFunctions](https://devexpress.github.io/testcafe/documentation/test-api/obtaining-data-from-the-client/).

Import and create an new instance of the Browser utils.

```js
import { Browser } from '../utils/browser'    
const browserUtil = new Browser()
```
    
Use the available methods in your tests.

```js
browserUtil.getUrl()
```
