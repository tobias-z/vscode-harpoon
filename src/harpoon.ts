import * as vscode from "vscode";
import ActiveProjectService from "./service/active-project-service";
import WorkspaceService from "./service/workspace-service";
import { getInstance } from "./util/singleton";

export function activate(context: vscode.ExtensionContext) {
  const activeProjectService = getInstance(ActiveProjectService);
  activeProjectService.addEditor({
    lastLine: 10,
    fileName: "/Users/tobiaszimmermann/Documents/Projects/reuse/hooks/src/App.js",
  });
  const disposable = vscode.commands.registerCommand("vscode-harpoon.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from vscode-harpoon!");
    const workspaceService = getInstance(WorkspaceService);
    workspaceService.changeWorkspace(1);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
