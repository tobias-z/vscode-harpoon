/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import ActiveProjectService from "./service/active-project-service";
import WorkspaceService from "./service/workspace-service";
import CommandFactory from "./commands/command-factory";
import { createGotoEditorCommand } from "./commands/goto-editor";
import createAddEditorCommand from "./commands/add-editor";
import createEditEditorsCommand from "./commands/edit-editors";
import createEditorQuickPickCommand from "./commands/editor-quick-pick";

export type State = "workspaceState" | "globalState";

export function getStateKey(state: State) {
    return "vscodeHarpoon" + state;
}

export function activate(context: vscode.ExtensionContext) {
    const commandFactory = new CommandFactory(context);
    registerCommands(context, commandFactory, "workspaceState");
    registerCommands(context, commandFactory, "globalState");
    return context;
}

function registerCommands(
    context: vscode.ExtensionContext,
    commandFactory: CommandFactory,
    state: State
) {
    const activeProjectService = new ActiveProjectService(
        context[state].get(getStateKey(state)) || []
    );
    const workspaceService = new WorkspaceService(activeProjectService, context, state);
    const gotoEditor = createGotoEditorCommand(workspaceService);

    const key = state === "globalState" ? "Global" : "";

    commandFactory.registerCommand(
        `add${key}Editor`,
        createAddEditorCommand(activeProjectService, workspaceService)
    );
    commandFactory.registerCommand(
        `edit${key}Editors`,
        createEditEditorsCommand(activeProjectService, workspaceService)
    );
    commandFactory.registerCommand(`goto${key}Editor1`, gotoEditor(1));
    commandFactory.registerCommand(`goto${key}Editor2`, gotoEditor(2));
    commandFactory.registerCommand(`goto${key}Editor3`, gotoEditor(3));
    commandFactory.registerCommand(`goto${key}Editor4`, gotoEditor(4));
    commandFactory.registerCommand(`goto${key}Editor5`, gotoEditor(5));
    commandFactory.registerCommand(`goto${key}Editor6`, gotoEditor(6));
    commandFactory.registerCommand(`goto${key}Editor7`, gotoEditor(7));
    commandFactory.registerCommand(`goto${key}Editor8`, gotoEditor(8));
    commandFactory.registerCommand(`goto${key}Editor9`, gotoEditor(9));
    commandFactory.registerCommand(
        `editor${key}QuickPick`,
        createEditorQuickPickCommand(activeProjectService, workspaceService)
    );
}
