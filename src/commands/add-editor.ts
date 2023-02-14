import * as vscode from "vscode";
import ActiveProjectService from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export default function createAddEditorCommand(
    activeProjectService: ActiveProjectService,
    workspaceService: WorkspaceService
) {
    return (editorId?: number) => {
        return () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor || editor.document.fileName.startsWith("Untitled")) {
                return;
            }

            activeProjectService.addEditor({
                editorId,
                fileName: editor.document.fileName,
            });
            workspaceService.saveWorkspace();
        };
    };
}
