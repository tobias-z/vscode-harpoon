import * as vscode from "vscode";
import { getInstance } from "../util/singleton";
import ActiveProjectService from "./active-project-service";

export default class WorkspaceService {
  constructor(private readonly activeProjectService: ActiveProjectService) {}

  public changeWorkspace(id: number) {
    const { fileName } = this.activeProjectService.getEditor(id);
    vscode.workspace.openTextDocument(fileName).then(doc => {
      vscode.window.showTextDocument(doc);
    });
  }
}
