import * as vscode from "vscode";
import ActiveProjectService, { Editor } from "./active-project-service";
import { getStateKey, State } from "../harpoon";

export default class WorkspaceService {
  private readonly stateKey: string;

  constructor(
    private readonly activeProjectService: ActiveProjectService,
    private readonly context: vscode.ExtensionContext,
    private readonly state: State
  ) {
    this.stateKey = getStateKey(state);
  }

  public async changeEditorById(id: number) {
    const editor = this.activeProjectService.getEditor(id);
    return await this.changeFile(editor);
  }

  public async changeEditorByName(editorName: string) {
    const editor = this.activeProjectService.activeEditors.find(
      editor => editor.fileName === editorName
    );
    return await this.changeFile(editor);
  }

  public saveWorkspace() {
    this.context[this.state].update(this.stateKey, this.activeProjectService.activeEditors);
  }

  private async changeFile(editor?: Editor) {
    if (!editor) {
      return;
    }
    const doc = await vscode.workspace.openTextDocument(editor.fileName.trim());
    return await vscode.window.showTextDocument(doc);
  }
}
