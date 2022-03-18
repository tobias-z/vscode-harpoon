import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  vscode.workspace
    .openTextDocument("/home/tobiasz/dev/js/vscode/vscode-harpoon/src/harpoon.ts")
    .then(doc => {
      doc.positionAt(10);
      vscode.window.showTextDocument(doc).then(() => {
        console.log(vscode.window.activeTextEditor?.selection.active.line);
      });
    });
  const disposable = vscode.commands.registerCommand("vscode-harpoon.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from vscode-harpoon!");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
