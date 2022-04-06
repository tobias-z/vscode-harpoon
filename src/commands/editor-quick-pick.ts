import * as vscode from "vscode";
import ActiveProjectService from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export default function createEditorQuickPickCommand(
  activeProjectService: ActiveProjectService,
  workspaceService: WorkspaceService
) {
  return async () => {
    const items = activeProjectService.activeEditors.map(editor => editor.fileName);
    const pickedEditor = await vscode.window.showQuickPick(items, {
      title: "Editor Quick Pick",
    });
    if (!pickedEditor) {
      return;
    }

    workspaceService.changeEditorByName(pickedEditor);
  };
}
