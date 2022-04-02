const executeCommand = require("./command-runner.cjs");
const { process } = require("./utils.cjs");

async function deploy() {
  executeCommand("yarn update-version");
  executeCommand("vsce publish --yarn");
}

process(deploy);
