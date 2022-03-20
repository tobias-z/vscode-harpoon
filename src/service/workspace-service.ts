import * as vscode from "vscode";
import ActiveProjectService from "./active-project-service";

export default class WorkspaceService {
  constructor(private readonly activeProjectService: ActiveProjectService) {}

  public changeWorkspace(id: number) {
    const editor = this.activeProjectService.getEditor(id);
    if (!editor) {
      return;
    }
    return vscode.workspace.openTextDocument(editor.fileName).then(doc => {
      return vscode.window.showTextDocument(doc);
    });
  }
}
