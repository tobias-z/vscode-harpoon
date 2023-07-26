import * as vscode from "vscode";
import ActiveProjectService, { Editor } from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export default function createEditorQuickPickCommand(
    activeProjectService: ActiveProjectService,
    workspaceService: WorkspaceService
) {
    return async () => {
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = activeProjectService.activeEditors
            .filter(editor => editor.fileName !== "_")
            .map(toQuickPickItem);

        quickPick.onDidAccept(() => {
            if (quickPick.selectedItems.length !== 1) {
                // Not sure how this could happen but better be sure
                return;
            }
            const pickedEditor = quickPick.selectedItems[0];
            if (!pickedEditor) {
                return;
            }
            workspaceService.changeEditorByName(pickedEditor.description!);
        });

        quickPick.onDidTriggerItemButton(e => {
            const itemToRemove = e.item.description!;
            activeProjectService.activeEditors = activeProjectService.activeEditors.filter(
                item => item.fileName !== itemToRemove
            );
            quickPick.items = quickPick.items.filter(
                item => item.description !== e.item.description
            );
            workspaceService.saveWorkspace();
        });

        quickPick.onDidHide(quickPick.dispose);
        quickPick.show();
    };
}

function toQuickPickItem(editor: Editor): vscode.QuickPickItem {
    const label = editor.fileName.substring(editor.fileName.lastIndexOf("/") + 1);

    return {
        label,
        description: editor.fileName,
        buttons: [
            {
                iconPath: new vscode.ThemeIcon("trash"),
                tooltip: "Remove",
            },
        ],
    };
}
