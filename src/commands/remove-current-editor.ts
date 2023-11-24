import * as vscode from "vscode";
import ActiveProjectService from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export function createRemoveCurrentEditorCommand(
    workspaceService: WorkspaceService,
    activeProjectService: ActiveProjectService
) {
    return async () => {
        let activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        activeProjectService.removeEditorByName(activeEditor.document.fileName);
        workspaceService.saveWorkspace();
    };
}
