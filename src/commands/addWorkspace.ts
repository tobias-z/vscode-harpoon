import * as vscode from "vscode";
import ActiveProjectService from "../service/active-project-service";

export default function createAddWorkspaceCommand(activeProjectService: ActiveProjectService) {
  return () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.fileName.startsWith("Untitled")) {
      return;
    }

    activeProjectService.addEditor({
      lastLine: editor.selection.active.line,
      fileName: editor.document.fileName,
    });
  };
}
