import { getInstance } from "../singleton";

type Editor = {
  fileName: string;
  lastLine: number;
};

class ActiveProjectService {
  private readonly activeEditors: Editor[] = [];

  public addEditor(editor: Editor) {
    this.activeEditors.push(editor);
  }

  public getEditor(id: number) {
    return this.activeEditors[id + 1];
  }
}

export default getInstance(ActiveProjectService);
