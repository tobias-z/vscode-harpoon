type Editor = {
  fileName: string;
};

export default class ActiveProjectService {
  constructor(private _activeEditors: Editor[]) {}

  public addEditor(editor: Editor) {
    this._activeEditors.push(editor);
  }

  public getEditor(id: number) {
    return this._activeEditors[id - 1];
  }

  public set activeEditors(editors: Editor[]) {
    this._activeEditors = editors;
  }

  public get activeEditors(): Editor[] {
    return this._activeEditors;
  }
}
