import * as vscode from "vscode";
import ActiveProjectService, { Editor } from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export type NavigationDirection = "navigateNext" | "navigatePrevious";

export default function createNavigateEditorCommand(
    activeProjectService: ActiveProjectService,
    workspaceService: WorkspaceService,
    direction: NavigationDirection
) {
    return () => {
        if (activeProjectService.activeEditors.length < 1) {
            return;
        }
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        const currentEditor: Editor = {
            fileName: activeEditor.document.fileName,
        };
        const currentEditorIndex = activeProjectService.activeEditors.findIndex(
            editor => editor.fileName === currentEditor.fileName
        );
        if (currentEditorIndex !== -1 && activeProjectService.activeEditors.length === 1) {
            return;
        }

        const nextNonFillerEditorIndex = activeProjectService.getNextNonFillerEditorIndex(
            currentEditorIndex,
            direction
        );
        if (nextNonFillerEditorIndex !== -1) {
            workspaceService.changeEditorById(nextNonFillerEditorIndex + 1);
        }
    };
}
