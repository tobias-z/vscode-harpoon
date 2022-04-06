import * as vscode from "vscode";
import ActiveProjectService, { Editor } from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export default function createEditorQuickPickCommand(
  activeProjectService: ActiveProjectService,
  workspaceService: WorkspaceService
) {
  return async () => {
    const items = activeProjectService.activeEditors.map(toQuickPickItem);
    const pickedEditor = await vscode.window.showQuickPick(items);
    if (!pickedEditor) {
      return;
    }

    workspaceService.changeEditorByName(pickedEditor.description!);
  };
}

function toQuickPickItem(editor: Editor) {
  const label = editor.fileName.substring(editor.fileName.lastIndexOf("/") + 1);

  return {
    label,
    description: editor.fileName,
  };
}
