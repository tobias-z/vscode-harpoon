export type Editor = {
    editorId?: number;
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
        if (this.hasEditor(this._activeEditors, editor) && !editor.editorId) {
            return;
        }
        if (editor.editorId) {
            // Ensure that the editor is always put at the decided index
            for (let i = 0; i < editor.editorId; i++) {
                if (this._activeEditors.length < i) {
                    this._activeEditors.push({
                        fileName: "_",
                    });
                }
            }
            this._activeEditors[editor.editorId - 1] = editor;
        } else {
            this._activeEditors.push(editor);
        }
    }

    public getEditor(id: number) {
        return this._activeEditors[id - 1];
    }

    public set activeEditors(editors: Editor[]) {
        this._activeEditors = editors.reduce((prev, curr) => {
            curr = getTrimmedEditor(curr);
            prev.push(curr);
            return prev;
        }, [] as Editor[]);
    }

    public get activeEditors(): Editor[] {
        return this._activeEditors;
    }

    private hasEditor(editors: Editor[], editor: Editor) {
        // We allow multiple empty lines so that someone can always add an editor to whatever number they want
        return editors.find(e => e.fileName === editor.fileName);
    }
}
