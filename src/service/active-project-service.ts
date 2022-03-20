type Editor = {
  fileName: string;
  lastLine: number;
};

export default class ActiveProjectService {
  private readonly activeEditors: Editor[] = [];

  public addEditor(editor: Editor) {
    this.activeEditors.push(editor);
  }

  public getEditor(id: number) {
    return this.activeEditors[id - 1];
  }

  editEditor(id: number, newEditor: Editor) {
    this.activeEditors[id - 1] = newEditor;
  }
}
