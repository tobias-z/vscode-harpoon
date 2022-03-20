import * as vscode from "vscode";
import CommandFactory from "./commands/command-factory";
import { getInstance } from "./util/singleton";
import ActiveProjectService from "./service/active-project-service";
import createAddEditorCommand from "./commands/add-editor";

export function activate(context: vscode.ExtensionContext) {
  const commandFactory = new CommandFactory(context);
  const activeProjectService = getInstance(ActiveProjectService);
  commandFactory.registerCommand("addEditor", createAddEditorCommand(activeProjectService));
}

export function deactivate() {}
