import * as vscode from "vscode";
import CommandFactory from "./commands/command-factory";
import { getInstance } from "./util/singleton";
import ActiveProjectService from "./service/active-project-service";
import createAddWorkspaceCommand from "./commands/addWorkspace";

export function activate(context: vscode.ExtensionContext) {
  const commandFactory = new CommandFactory(context);
  const activeProjectService = getInstance(ActiveProjectService);
  commandFactory.registerCommand("addWorkspace", createAddWorkspaceCommand(activeProjectService));
}

export function deactivate() {}
