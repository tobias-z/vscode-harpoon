export type Editor = {
  fileName: string;
};

function getTrimmedEditor(editor: Editor) {
  editor.fileName = editor.fileName.trim();
  return editor;
}

export default class ActiveProjectService {
  constructor(private _activeEditors: Editor[]) {}

  public addEditor(editor: Editor) {
    editor = getTrimmedEditor(editor);
    if (this.hasEditor(this.activeEditors, editor)) {
      return;
    }
    this._activeEditors.push(editor);
  }

  public getEditor(id: number) {
    return this._activeEditors[id - 1];
  }

  public set activeEditors(editors: Editor[]) {
    this._activeEditors = editors.reduce((prev, curr) => {
      curr = getTrimmedEditor(curr);
      if (!this.hasEditor(prev, curr)) {
        prev.push(curr);
      }
      return prev;
    }, [] as Editor[]);
  }

  public get activeEditors(): Editor[] {
    return this._activeEditors;
  }

  private hasEditor(editors: Editor[], editor: Editor) {
    return editors.find(e => e.fileName === editor.fileName);
  }
}
