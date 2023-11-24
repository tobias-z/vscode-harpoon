/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import ActiveProjectService, { Editor } from "./service/active-project-service";
import WorkspaceService from "./service/workspace-service";
import CommandFactory from "./commands/command-factory";
import { createGotoEditorCommand } from "./commands/goto-editor";
import createAddEditorCommand from "./commands/add-editor";
import createEditEditorsCommand from "./commands/edit-editors";
import createEditorQuickPickCommand from "./commands/editor-quick-pick";
import createGotoPreviousHarpoonEditorCommand from "./commands/goto-previous-harpoon-editor";
import { createRemoveCurrentEditorCommand } from "./commands/remove-current-editor";
import { createRemoveEditorByIdCommand } from "./commands/remove-editor-by-id";

export type State = "workspaceState" | "globalState";

export type ProjectState = {
    activeEditors: Editor[];
    previousEditor?: Editor;
};

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
    let prevState = context[state].get<ProjectState>(getStateKey(state));
    if (!prevState) {
        prevState = { activeEditors: [] };
    }
    // ensure compatability with old old harpoon editors. They might still have the old state as an array, so we need to mutate it to the new structure.
    if (Array.isArray(prevState)) {
        prevState = { activeEditors: prevState };
    }
    const activeProjectService = new ActiveProjectService(
        prevState.activeEditors,
        prevState.previousEditor
    );
    const workspaceService = new WorkspaceService(activeProjectService, context, state);
    const gotoEditor = createGotoEditorCommand(workspaceService);

    const key = state === "globalState" ? "Global" : "";
    const addEditor = createAddEditorCommand(activeProjectService, workspaceService);

    commandFactory.registerCommand(`add${key}Editor`, addEditor());
    commandFactory.registerCommand(
        `edit${key}Editors`,
        createEditEditorsCommand(activeProjectService, workspaceService)
    );
    commandFactory.registerCommand(`add${key}Editor1`, addEditor(1));
    commandFactory.registerCommand(`add${key}Editor2`, addEditor(2));
    commandFactory.registerCommand(`add${key}Editor3`, addEditor(3));
    commandFactory.registerCommand(`add${key}Editor4`, addEditor(4));
    commandFactory.registerCommand(`add${key}Editor5`, addEditor(5));
    commandFactory.registerCommand(`add${key}Editor6`, addEditor(6));
    commandFactory.registerCommand(`add${key}Editor7`, addEditor(7));
    commandFactory.registerCommand(`add${key}Editor8`, addEditor(8));
    commandFactory.registerCommand(`add${key}Editor9`, addEditor(9));
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
    commandFactory.registerCommand(
        `gotoPrevious${key}HarpoonEditor`,
        createGotoPreviousHarpoonEditorCommand(activeProjectService, workspaceService)
    );

    commandFactory.registerCommand(`removeCurrent${key}Editor`, createRemoveCurrentEditorCommand(workspaceService, activeProjectService));

    const removeById = createRemoveEditorByIdCommand(workspaceService, activeProjectService);
    commandFactory.registerCommand(`remove${key}Editor1`, removeById(1));
    commandFactory.registerCommand(`remove${key}Editor2`, removeById(2));
    commandFactory.registerCommand(`remove${key}Editor3`, removeById(3));
    commandFactory.registerCommand(`remove${key}Editor4`, removeById(4));
    commandFactory.registerCommand(`remove${key}Editor5`, removeById(5));
    commandFactory.registerCommand(`remove${key}Editor6`, removeById(6));
    commandFactory.registerCommand(`remove${key}Editor7`, removeById(7));
    commandFactory.registerCommand(`remove${key}Editor8`, removeById(8));
    commandFactory.registerCommand(`remove${key}Editor9`, removeById(9));
}
