const fs = require("fs/promises");
const path = require("path");
const executeCommand = require("./command-runner.cjs");
const { getArgs, handleProcess } = require("./utils.cjs");

async function version() {
    const args = getArgs();
    const isMinor = args.includes("--minor");
    if (!args.includes("--major") && !isMinor) {
        executeCommand("npm version patch");
        return;
    }

    const packageJson = await getPackageJson();
    packageJson.version = getNewVersion(packageJson.version, isMinor);
    await fs.writeFile(getPath(), JSON.stringify(packageJson));
    executeCommand(`git tag v${packageJson.version}`);
}

function getNewVersion(currentVersion, isMinor) {
    if (isMinor) {
        const oldMinor = currentVersion.split(".")[1];
        return `${parseFloat(currentVersion)}.${parseInt(oldMinor) + 1}.0`;
    }
    const newMajor = parseFloat(currentVersion) + 1;
    return `${newMajor}.0.0`;
}

async function getPackageJson() {
    const packageJson = await fs.readFile(getPath());
    return JSON.parse(packageJson);
}

function getPath() {
    return path.resolve(__dirname, "../package.json");
}

handleProcess(version);
