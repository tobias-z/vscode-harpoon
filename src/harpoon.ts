/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import ActiveProjectService, { Editor } from "./service/active-project-service";
import WorkspaceService from "./service/workspace-service";
import CommandFactory, { EditorRange } from "./commands/command-factory";
import { createGotoEditorCommand } from "./commands/goto-editor";
import createAddEditorCommand from "./commands/add-editor";
import createEditEditorsCommand from "./commands/edit-editors";
import createEditorQuickPickCommand from "./commands/editor-quick-pick";
import createGotoPreviousHarpoonEditorCommand from "./commands/goto-previous-harpoon-editor";
import { createRemoveCurrentEditorCommand } from "./commands/remove-current-editor";
import { createRemoveEditorByIdCommand } from "./commands/remove-editor-by-id";

function loopEditorIds(fn: (id: EditorRange) => void) {
    for (let i = 1; i <= 9; i++) {
        fn(i as EditorRange);
    }
}

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

    const key = state === "globalState" ? "Global" : "";

    const addEditor = createAddEditorCommand(activeProjectService, workspaceService);

    commandFactory.registerCommand(`add${key}Editor`, addEditor());
    commandFactory.registerCommand(
        `edit${key}Editors`,
        createEditEditorsCommand(activeProjectService, workspaceService)
    );

    const gotoEditor = createGotoEditorCommand(workspaceService);
    const removeById = createRemoveEditorByIdCommand(workspaceService, activeProjectService);

    loopEditorIds(id => {
        commandFactory.registerCommand(`add${key}Editor${id}`, addEditor(id));
        commandFactory.registerCommand(`goto${key}Editor${id}`, gotoEditor(id));
        commandFactory.registerCommand(`remove${key}Editor${id}`, removeById(id));
    });

    commandFactory.registerCommand(
        `editor${key}QuickPick`,
        createEditorQuickPickCommand(activeProjectService, workspaceService)
    );
    commandFactory.registerCommand(
        `gotoPrevious${key}HarpoonEditor`,
        createGotoPreviousHarpoonEditorCommand(activeProjectService, workspaceService)
    );

    commandFactory.registerCommand(
        `removeCurrent${key}Editor`,
        createRemoveCurrentEditorCommand(workspaceService, activeProjectService)
    );

}
