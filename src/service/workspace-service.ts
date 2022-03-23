import * as vscode from "vscode";
import ActiveProjectService from "./active-project-service";
import { getStateKey } from "../harpoon";

export default class WorkspaceService {
  private readonly stateKey: string;

  constructor(
    private readonly activeProjectService: ActiveProjectService,
    private readonly context: vscode.ExtensionContext,
    private readonly state: "workspaceState" | "globalState"
  ) {
    this.stateKey = getStateKey(state);
  }

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
    this.context[this.state].update(this.stateKey, this.activeProjectService.activeEditors);
  }
}
