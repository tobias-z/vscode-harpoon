export type Editor = {
    editorId?: number;
    fileName: string;
};

function getTrimmedEditor(editor: Editor) {
    editor.fileName = editor.fileName.trim();
    return editor;
}

export default class ActiveProjectService {
    constructor(private _activeEditors: Editor[], private _previousEditor?: Editor) { }

    public addEditor(editor: Editor) {
        editor = getTrimmedEditor(editor);
        if (this.hasEditor(editor) && !editor.editorId) {
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
            const firstFiller = this._activeEditors.findIndex(item => item.fileName === "_");
            if (firstFiller === -1) {
                this._activeEditors.push(editor);
            } else {
                this._activeEditors[firstFiller] = editor;
            }
        }
    }

    public getEditor(id: number) {
        return this._activeEditors[id - 1];
    }

    public removeEditorByName(fileName: string) {
        this._activeEditors = this._activeEditors.map(editor => {
            if (editor.fileName !== fileName) {
                return editor;
            }
            return {
                fileName: "_",
            };
        });
    }

    public removeEditorById(id: number): boolean {
        if (id > this._activeEditors.length) {
            return false;
        }
        this._activeEditors[id] = {
            fileName: "_",
        };
        return true;
    }

    public set activeEditors(editors: Editor[]) {
        const hasActualEditor = editors.some(e => e.fileName !== "_");
        if (hasActualEditor) {
            this._activeEditors = editors.map(getTrimmedEditor);
        } else {
            this._activeEditors = [];
        }
    }

    public setPreviousEditor(editor: Editor) {
        this._previousEditor = editor;
    }

    public getPreviousEditor(): Editor | undefined {
        return this._previousEditor;
    }

    public get activeEditors(): Editor[] {
        return this._activeEditors;
    }

    public hasEditor(editor: Editor) {
        return this._activeEditors.some(e => e.fileName === editor.fileName);
    }
}
