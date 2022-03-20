import * as vscode from "vscode";
import { getInstance } from "../util/singleton";
import ActiveProjectService from "./active-project-service";

export default class WorkspaceService {
  private readonly activeProjectService = getInstance(ActiveProjectService);

  public changeWorkspace(id: number) {
    const { fileName, lastLine } = this.activeProjectService.getEditor(id);
    vscode.workspace.openTextDocument(fileName).then(doc => {
      vscode.window.showTextDocument(doc);
    });
  }
}

// vscode.window.activeTextEditor?.selection.active.line
