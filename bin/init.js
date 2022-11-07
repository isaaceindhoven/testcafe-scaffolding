#!/usr/bin/env node
/* eslint-disable consistent-return */
/* eslint no-console: "off" */

require("colors");
const readlineSync = require("readline-sync");
const fs = require("fs");
const fx = require("mkdir-recursive");
const path = require("path");
const execSync = require("child_process").exec;
const util = require("util");
const yarnOrNpm = require("yarn-or-npm");

const hasYarn = yarnOrNpm() === "yarn";
const pkg = path.resolve("package.json");
// eslint-disable-next-line import/no-dynamic-require
const pkgObject = require(pkg);
const defaultTestSuitePath = "tests/e2e";

const exec = async (command, { verbose } = { verbose: true }) => {
    const execAsync = util.promisify(execSync);
    const { stdout, stderr } = await execAsync(command);
    if (verbose) console.log(stdout.gray);
    console.error(stderr.gray);
};

const findAndReplaceInFile = ({ file, find, replace }) =>
    fs.readFile(file, "utf8", (err, data) => {
        if (err) return console.log(`Cannot read file ${file}`);

        const regex = new RegExp(find, "g");
        const result = data.replace(regex, replace);

        fs.writeFile(file, result, "utf8", (error) => {
            if (error) return console.log(err);
        });
    });

/**
 * Create the example TestCafe Page Models
 */
const createPageModels = ({ testSuitePath, isInstallExampleTests }) => {
    const paths = ["tests", "page-models"];

    fx.mkdirSync(path.resolve(testSuitePath));
    paths.forEach((subDirectory) => {
        const dstPath = path.join(testSuitePath, subDirectory);
        if (fs.existsSync(dstPath)) {
            console.log(`Directory ${dstPath} already exists. Ignoring`.blue);
            return;
        } else {
            fx.mkdirSync(path.join(testSuitePath, subDirectory));
        }

        // add .gitkeep files to the directories when no example tests are chosen
        if (!isInstallExampleTests) {
            fs.closeSync(fs.openSync(path.join(dstPath, ".gitkeep"), "w"));
        }

        // Copy example data:
        if (isInstallExampleTests) {
            const sourcePath = path.join(
                __dirname,
                "..",
                "examples",
                subDirectory
            );
            fs.readdirSync(`${sourcePath}`).forEach((file) => {
                if (/\.js$/.test(file)) {
                    fs.copyFileSync(
                        path.join(sourcePath, file),
                        path.join(dstPath, file)
                    );
                    findAndReplaceInFile({
                        file: path.join(dstPath, file),
                        find: defaultTestSuitePath,
                        replace: testSuitePath,
                    });
                }
            });
        }

        // Copy utilities
        fx.mkdirSync(path.join(testSuitePath, "utils"));
        fs.copyFileSync(
            path.join(__dirname, "..", "examples", "utils", "browser.js"),
            path.join(testSuitePath, "utils", "browser.js")
        );
    });
};

/**
 * Create the example TestCafe Page Models
 */
const createRunner = ({
    testSuitePath,
    isInstallAllureReporting,
    isInstallBrowserstack,
}) => {
    const date = new Date();
    const dateString = `${date.getUTCFullYear()}${
        date.getUTCMonth() + 1
    }${date.getUTCDate()}`;

    const doesRunnerAlreadyExist = fs.existsSync(
        path.join(testSuitePath, "runner.js")
    );

    const runnerFile = `${[
        "testcafe",
        ...(isInstallAllureReporting ? ["allure"] : []),
        ...(isInstallBrowserstack ? ["browserstack"] : []),
    ].join("-")}.js`;
    const sourcePath = path.join(__dirname, "..", "examples");
    const runnerFileSourcePath = path.join(sourcePath, runnerFile);
    const runnerFileDestinationPath = doesRunnerAlreadyExist
        ? path.join(testSuitePath, `runner-${dateString}.js`)
        : path.join(testSuitePath, "runner.js");

    if (doesRunnerAlreadyExist) {
        console.log(
            `runner.js already exists. Created a new runner named "runner-${dateString}.js".`
                .yellow
        );
    }

    fs.copyFileSync(runnerFileSourcePath, runnerFileDestinationPath);
    findAndReplaceInFile({
        file: runnerFileDestinationPath,
        find: defaultTestSuitePath,
        replace: testSuitePath,
    });
};

/**
 * Testcafe allure-config needs forward slashes as
 * directory separator otherwise testcafe won't close
 */
const createAllureConfig = ({ testSuitePath }) => {
    if (fs.existsSync("allure.config.js"))
        return console.log("allure.config.js already defined. Ignoring.".blue);
    const allureDocConfig = `module.exports = {
    RESULT_DIR: '${testSuitePath}/allure/allure-results',
    REPORT_DIR: '${testSuitePath}/allure/allure-report',
    SCREENSHOT_DIR: '${testSuitePath}/allure/screenshots',
    META: {
        ISSUE_URL: 'https://jira.example.nl/browse/',
    }
};`;
    fs.writeFileSync("allure.config.js", allureDocConfig, (err) => {
        if (err)
            throw console.error(
                "allure.config.js could not be created!".bgRed.white.bold
            );
        console.log("allure.config.js created.".green);
    });
};

/**
 * Update the package.json with new dependencies
 */
const updatePackageJson = async ({
    testSuitePath,
    isInstallAllureReporting,
    isInstallBrowserstack,
}) => {
    console.log(["", "Updating package.json...", ""].join("\n").gray);

    const packages = [
        "testcafe",
        ...(isInstallAllureReporting
            ? [
                  "testcafe-reporter-allure@npm:@isaac.frontend/testcafe-reporter-allure",
              ]
            : []),
        ...(isInstallBrowserstack
            ? ["testcafe-browser-provider-browserstack"]
            : []),
    ].join(" ");

    const addScriptToPkgJson = (script) => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const currentPkgObject = require(pkg);

        try {
            if (!currentPkgObject.scripts) currentPkgObject.scripts = {};
            if (currentPkgObject.scripts[script.key]) {
                console.log(
                    `${script.key} already exists in the package.json. We won't override previously declared scripts`
                        .yellow
                );
                console.log(
                    `The value of the script would have been: ${script.value}`
                );
            } else {
                currentPkgObject.scripts[script.key] = script.value;

                fs.writeFileSync(
                    pkg,
                    JSON.stringify(currentPkgObject, null, 2),
                    { encoding: "utf8" }
                );
            }
        } catch (e) {
            console.error(`Script could not be added: ${e}`.bgRed.white.bold);
        }
    };

    addScriptToPkgJson({
        key: "test:e2e",
        value: `node ${testSuitePath}/runner.js`,
    });

    console.log(["", "installing packages...", ""].join("\n").gray);

    if (hasYarn) {
        await exec(`yarn add -D ${packages}`);
    } else {
        await exec(`npm install -D --force ${packages}`);
    }

    console.log(
        ["", "package.json updated and new dependencies installed.", ""].join(
            "\n"
        ).green
    );
};

const removeScaffoldingPkg = async () => {
    if (hasYarn) {
        await exec("yarn remove @isaac.frontend/testcafe-scaffolding", {
            verbose: false,
        });
    } else {
        await exec("npm rm @isaac.frontend/testcafe-scaffolding", {
            verbose: false,
        });
    }
    console.log(
        "Removed @isaac.frontend/testcafe-scaffolding dependency".green
    );
};

const addFoldersToGitIgnore = ({ testSuitePath }) => {
    const ignoreTemplateString = `
# Test report generation
${testSuitePath}/allure
${testSuitePath}/screenshots
`;
    try {
        fs.appendFileSync(".gitignore", ignoreTemplateString);
        console.log("test report folders added to .gitignore".gray);
    } catch (e) {
        console.error(`Script could not be added: ${e}`.bgRed.white.bold);
    }
};

/**
 * Init
 */
(async () => {
    console.clear();
    console.log(
        [
            "-".repeat(100).gray,
            "Welcome to the initialization process".bold,
            "-".repeat(100).gray,
            "",
        ].join("\n")
    );
    // Makes the script crash on unhandled rejections instead of silently ignoring them.
    process.on("unhandledRejection", (err) => {
        throw err;
    });

    if (!fs.existsSync(pkg)) {
        console.error(
            'No package.json found. Please run this command in the root of your project or run "npm init" / "yarn init"!'
                .bgRed.white.bold
        );
        process.exit(1);
    }

    const testSuitePath = readlineSync
        .question(
            "In which directory do you want to keep your test suite? (default: $<defaultInput>): ",
            {
                defaultInput: defaultTestSuitePath,
            }
        )
        // Always use forward slashes as it will be running in package.json scripts
        .replace(/\\/, "/")
        .replace(/^\/|\/$/, "");

    const isInstallExampleTests = readlineSync.keyInYN(
        "Install example tests?"
    );

    const isInstallAllureReporting = readlineSync.keyInYN(
        "Install Allure reporting?"
    );
    const isInstallBrowserstack = readlineSync.keyInYN(
        "Install BrowserStack integration?"
    );
    const isRemovingTestcafeScaffolding =
        pkgObject &&
        pkgObject.devDependencies &&
        pkgObject.devDependencies["@isaac.frontend/testcafe-scaffolding"]
            ? readlineSync.keyInYN(
                  "After running this initialization, you no longer need this tool as a dependency. Do you want to remove it after this script has ran?"
              )
            : undefined;

    console.log(
        [
            "",
            "The following will be installed:".gray,
            `Test suite path          : ${`${testSuitePath}`.bold}`,
            `Example data             : ${`${isInstallExampleTests}`.bold}`,
            `Allure reporting         : ${`${isInstallAllureReporting}`.bold}`,
            `Browserstack integration : ${`${isInstallBrowserstack}`.bold}`,
            ...(typeof isRemovingTestcafeScaffolding !== "undefined"
                ? [
                      `Remove @isaac.frontend/testcafe-scaffolding : ${
                          `${isRemovingTestcafeScaffolding}`.bold
                      }`,
                  ]
                : []),
            "",
        ].join("\n")
    );

    if (readlineSync.keyInYN("Is this correct?")) {
        console.log(
            [
                "",
                "-".repeat(100).gray,
                "",
                "Starting initialization process".cyan,
                "",
            ].join("\n")
        );

        const context = {
            testSuitePath,
            isInstallAllureReporting,
            isInstallBrowserstack,
            isInstallExampleTests,
        };

        try {
            createPageModels(context);
            createRunner(context);
            addFoldersToGitIgnore(context);
            if (isInstallAllureReporting) createAllureConfig(context);
            await updatePackageJson(context);
            if (
                typeof isRemovingTestcafeScaffolding !== "undefined" &&
                isRemovingTestcafeScaffolding === true
            )
                await removeScaffoldingPkg();
        } catch (err) {
            console.error("Something went horribly wrong!".bgRed.white.bold);
            console.error(err.toString().red);
            process.exit(1);
        }

        console.log(
            [
                "-".repeat(100).gray,
                `All done. Your TestCafé test suite is now available in ${testSuitePath}`
                    .green,
                "See https://github.com/isaaceindhoven/testcafe-scaffolding.git for more details and examples.",
                "",
                "To run your test suite, type: `npm run test:e2e` or `yarn test:e2e`"
                    .bold,
                "-".repeat(100).gray,
            ].join("\n")
        );
    } else {
        console.log("Aborting");
        process.exit(0);
    }
})();
