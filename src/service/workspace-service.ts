import * as vscode from "vscode";
import ActiveProjectService from "./active-project-service";
import { WORKSPACE_STATE } from "../harpoon";

export default class WorkspaceService {
  constructor(
    private readonly activeProjectService: ActiveProjectService,
    private readonly context: vscode.ExtensionContext
  ) {}

  public changeEditor(id: number) {
    const editor = this.activeProjectService.getEditor(id);
    if (!editor) {
      return;
    }
    return vscode.workspace.openTextDocument(editor.fileName).then(doc => {
      return vscode.window.showTextDocument(doc);
    });
  }

  public saveWorkspace() {
    this.context.workspaceState.update(WORKSPACE_STATE, this.activeProjectService.getAllEditors());
  }
}
