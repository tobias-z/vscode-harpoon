type Editor = {
  fileName: string;
  lastLine: number;
};

export default class ActiveProjectService {
  constructor(private readonly activeEditors: Editor[]) {}

  public addEditor(editor: Editor) {
    this.activeEditors.push(editor);
  }

  public getEditor(id: number) {
    return this.activeEditors[id - 1];
  }

  public getAllEditors() {
    return this.activeEditors;
  }
}
