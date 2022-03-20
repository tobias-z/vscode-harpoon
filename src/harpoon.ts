import * as vscode from "vscode";
import CommandFactory from "./commands/command-factory";
import { getInstance } from "./util/singleton";
import ActiveProjectService from "./service/active-project-service";
import createAddEditorCommand from "./commands/add-editor";
import { createGotoEditorCommand } from "./commands/goto-editor";
import WorkspaceService from "./service/workspace-service";

export function activate(context: vscode.ExtensionContext) {
  const commandFactory = new CommandFactory(context);
  const activeProjectService = getInstance(ActiveProjectService);
  const gotoEditor = createGotoEditorCommand(getInstance(WorkspaceService, activeProjectService));

  commandFactory.registerCommand("addEditor", createAddEditorCommand(activeProjectService));
  commandFactory.registerCommand("gotoEditor1", gotoEditor(1));
  commandFactory.registerCommand("gotoEditor2", gotoEditor(2));
  commandFactory.registerCommand("gotoEditor3", gotoEditor(3));
  commandFactory.registerCommand("gotoEditor4", gotoEditor(4));
  commandFactory.registerCommand("gotoEditor5", gotoEditor(5));
  commandFactory.registerCommand("gotoEditor6", gotoEditor(6));
  commandFactory.registerCommand("gotoEditor7", gotoEditor(7));
  commandFactory.registerCommand("gotoEditor8", gotoEditor(8));
  commandFactory.registerCommand("gotoEditor9", gotoEditor(9));
}

export function deactivate() {}
