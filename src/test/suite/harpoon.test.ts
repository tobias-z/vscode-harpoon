import * as vscode from "vscode";
import * as assert from "assert";
import { getSlash } from "../utils";
import * as fs from "fs/promises";

suite("Harpoon runs correctly", () => {
  test("can add files and go to them", async function () {
    this.timeout(10000);
    await openFile("package.json");
    await vscode.commands.executeCommand("vscode-harpoon.addEditor");

    await openFile("README.md");
    await vscode.commands.executeCommand("vscode-harpoon.addEditor");

    await vscode.commands.executeCommand("vscode-harpoon.gotoEditor1");
    isFileName("package.json");

    await vscode.commands.executeCommand("vscode-harpoon.gotoEditor2");
    isFileName("README.md");

    // Global editor is not same as normal editor
    await vscode.commands.executeCommand("vscode-harpoon.addGlobalEditor");
    await vscode.commands.executeCommand("vscode-harpoon.gotoEditor1");
    await vscode.commands.executeCommand("vscode-harpoon.gotoGlobalEditor1");
    isFileName("README.md");
  });
});

async function openFile(fileName: string) {
  const file = vscode.Uri.file(`${process.cwd()}${getSlash()}${fileName}`);
  const doc = await vscode.workspace.openTextDocument(file);
  (await fs.readdir(process.cwd())).forEach(console.log);
  return await vscode.window.showTextDocument(doc);
}

function isFileName(fileName: string) {
  const currentFile = vscode.window.activeTextEditor?.document.fileName;
  assert.strictEqual(`${process.cwd()}${getSlash()}${fileName}`, currentFile);
}
