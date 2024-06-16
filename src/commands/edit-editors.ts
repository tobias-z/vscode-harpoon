import * as vscode from "vscode";
import ActiveProjectService from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";
import { getSlash, isWindows } from "../util/system";
import { homedir } from "os";

const HARPOON_FILE = "vscodeHarpoon.harpoon";
const WINDOWS_FILE_EXP = /^[a-zA-Z]:.*$/;
const WINDOWS_FILE_REGEXP = new RegExp(WINDOWS_FILE_EXP);

async function prepareEditFile() {
    const wsedit = new vscode.WorkspaceEdit();
    const slash = getSlash();
    const filePath = vscode.Uri.file(`${homedir()}${slash}.vscode${slash}${HARPOON_FILE}`);
    wsedit.createFile(filePath, { overwrite: true });
    await vscode.workspace.applyEdit(wsedit);
    return filePath;
}

function isEditor(editor: string) {
    // Used as a filler value
    if (editor === "_") {
        return true;
    }
    if (!isWindows()) {
        return editor.startsWith(getSlash());
    }
    return WINDOWS_FILE_REGEXP.test(editor);
}

export default function createEditEditorsCommand(
    activeProjectService: ActiveProjectService,
    workspaceService: WorkspaceService
) {
    function onEditListener() {
        return vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.fileName.includes(HARPOON_FILE)) {
                // This has to be done so the user doens't need to save manually and doesn't get the annoying popup
                e.document.save();
                activeProjectService.activeEditors = e.document
                    .getText()
                    .split(/\r?\n/)
                    .filter(isEditor)
                    .map(editor => ({
                        fileName: editor,
                    }));
            }
        });
    }

    function onEditorCloseListener(uri: vscode.Uri, onDispose: () => void) {
        const changeVisabilityDisposable = vscode.window.onDidChangeVisibleTextEditors(event => {
            const hasHarpoonFileOpen = event.some(editor =>
                editor.document.fileName.includes(HARPOON_FILE)
            );
            if (hasHarpoonFileOpen) {
                return;
            }
            deleteHarpoonFile();
        });

        const closedDocumentDisposable = vscode.workspace.onDidCloseTextDocument(doc => {
            if (!doc.fileName.includes(HARPOON_FILE)) {
                return;
            }
            deleteHarpoonFile();
        });

        function deleteHarpoonFile() {
            vscode.workspace.fs.delete(uri);
            closedDocumentDisposable.dispose();
            changeVisabilityDisposable.dispose();
            onDispose();
            workspaceService.saveWorkspace();
        }
    }

    function insertCurrentEditors(textEditor: vscode.TextEditor) {
        const startPosition = new vscode.Position(0, 0);
        textEditor
            .edit(builder => {
                builder.replace(
                    startPosition,
                    activeProjectService.activeEditors.map(editor => editor.fileName).join("\n")
                );
            })
            .then(() => {
                textEditor.selection = new vscode.Selection(startPosition, startPosition);
            });
    }

    return () => {
        const workspace = vscode.workspace.workspaceFolders;
        if (
            !workspace ||
            vscode.window.activeTextEditor?.document.fileName.endsWith(HARPOON_FILE)
        ) {
            return;
        }
        prepareEditFile().then(filePath => {
            const disposable = onEditListener();
            vscode.workspace.openTextDocument(filePath).then(doc => {
                vscode.window.showTextDocument(doc).then(textEditor => {
                    onEditorCloseListener(filePath, disposable.dispose);
                    insertCurrentEditors(textEditor);
                });
            });
        });
    };
}
