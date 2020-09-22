# Allure reporting

During the initialization you will be asked if you want to install Allure reporting. This will extend the TestCafé runner functionality with the [testcafe-reporter-allure](https://www.npmjs.com/package/@isaac.frontend/testcafe-reporter-allure) plugin. This plugin will generate a result set for Allure in `tests/e2e/allure/allure-results`. Information on how to use it can be found [here](https://isaaceindhoven.github.io/testcafe-reporter-allure/ci/jenkins.html)

#### View Allure locally  (Requires a local JAVA installation)
You will need to generate the reports from the result-set locally using the command line tool. You can download this tool in several formats. More information available in the [Allure documentation](https://docs.qameta.io/allure/#_get_started).

#### WIP - How to write your e2e tests with proper integration.
Allure is a great tool in showing our clients how our project and its tests are performing. Providing a non-technical view on our test suites adds a return-on-investment on our projects. It shows non-technical stakeholders the usefulness of a end-to-end test suite.

How can we provide metadata to the TestCafé test suite so that our actions defined the DSL and Page Models can be shown in a non-technical way?

See Selenium *Step* annotations as example for this.
