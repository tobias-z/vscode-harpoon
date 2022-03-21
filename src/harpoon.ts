/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import ActiveProjectService from "./service/active-project-service";
import WorkspaceService from "./service/workspace-service";
import CommandFactory from "./commands/command-factory";
import { createGotoEditorCommand } from "./commands/goto-editor";
import createAddEditorCommand from "./commands/add-editor";
import createEditEditorsCommand from "./commands/edit-editors";

export const WORKSPACE_STATE = "vscodeHarpoonWorkspace";

export function activate(context: vscode.ExtensionContext) {
  const commandFactory = new CommandFactory(context);
  const activeProjectService = new ActiveProjectService(
    context.workspaceState.get(WORKSPACE_STATE) || []
  );
  const workspaceService = new WorkspaceService(activeProjectService, context);
  const gotoEditor = createGotoEditorCommand(workspaceService);

  commandFactory.registerCommand(
    "addEditor",
    createAddEditorCommand(activeProjectService, workspaceService)
  );
  commandFactory.registerCommand(
    "editEditors",
    createEditEditorsCommand(activeProjectService, workspaceService)
  );
  commandFactory.registerCommand("gotoEditor1", gotoEditor(1));
  commandFactory.registerCommand("gotoEditor2", gotoEditor(2));
  commandFactory.registerCommand("gotoEditor3", gotoEditor(3));
  commandFactory.registerCommand("gotoEditor4", gotoEditor(4));
  commandFactory.registerCommand("gotoEditor5", gotoEditor(5));
  commandFactory.registerCommand("gotoEditor6", gotoEditor(6));
  commandFactory.registerCommand("gotoEditor7", gotoEditor(7));
  commandFactory.registerCommand("gotoEditor8", gotoEditor(8));
  commandFactory.registerCommand("gotoEditor9", gotoEditor(9));

  return context;
}
