import * as vscode from "vscode";
import * as assert from "assert";

suite("Harpoon runs correctly", () => {
  test("can add files and go to them", async () => {
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
  const doc = await vscode.workspace.openTextDocument(`${process.cwd()}/${fileName}`);
  return await vscode.window.showTextDocument(doc);
}

function isFileName(fileName: string) {
  const currentFile = vscode.window.activeTextEditor?.document.fileName;
  assert.strictEqual(`${process.cwd()}/${fileName}`, currentFile);
}
