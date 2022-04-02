const fs = require("fs/promises");
const path = require("path");
const executeCommand = require("./command-runner.cjs");
const { getArgs, handleProcess } = require("./utils.cjs");

async function version() {
  const args = getArgs();
  if (!args.includes("--major")) {
    executeCommand("npm version patch");
    return;
  }

  const packageJson = await getPackageJson();
  const newMajor = parseFloat(packageJson.version) + 1;
  packageJson.version = `${newMajor}.0.0`;
  await fs.writeFile(getPath(), JSON.stringify(packageJson));
}

async function getPackageJson() {
  const packageJson = await fs.readFile(getPath());
  return JSON.parse(packageJson);
}

function getPath() {
  return path.resolve(__dirname, "../package.json");
}

handleProcess(version);
