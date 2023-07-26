import * as vscode from "vscode";
import ActiveProjectService, { Editor } from "../service/active-project-service";
import WorkspaceService from "../service/workspace-service";

export default function createEditorQuickPickCommand(
    activeProjectService: ActiveProjectService,
    workspaceService: WorkspaceService
) {
    return async () => {
        const quickPick = vscode.window.createQuickPick();
        quickPick.items = activeProjectService.activeEditors.reduce((acc, editor, i) => {
            if (editor.fileName !== "_") {
                acc.push(toQuickPickItem(editor, i));
            }
            return acc;
        }, [] as vscode.QuickPickItem[]);

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
            quickPick.items = quickPick.items.filter(item => item.label !== e.item.label);

            const removedItemIndex = Number(e.item.label.substring(0, 1)) - 1;
            let hasIndexSpecificEditorAfter = false;
            for (let i = removedItemIndex; i < activeProjectService.activeEditors.length; i++) {
                if (activeProjectService.activeEditors[i].fileName === "_") {
                    hasIndexSpecificEditorAfter = true;
                    break;
                }
            }
            if (hasIndexSpecificEditorAfter) {
                // keep the indexes as they are
                activeProjectService.activeEditors[removedItemIndex] = {
                    fileName: "_",
                };
            } else {
                activeProjectService.activeEditors.splice(removedItemIndex, 1);
            }

            workspaceService.saveWorkspace();
            if (quickPick.items.length === 0) {
                // no need to show the quick pick if the last one has been removed
                quickPick.hide();
            }
        });

        quickPick.onDidHide(quickPick.dispose);
        quickPick.show();
    };
}

function toQuickPickItem(editor: Editor, i: number): vscode.QuickPickItem {
    const label = editor.fileName.substring(editor.fileName.lastIndexOf("/") + 1);

    return {
        label: `${i + 1}. ${label}`,
        description: editor.fileName,
        buttons: [
            {
                iconPath: new vscode.ThemeIcon("trash"),
                tooltip: "Remove",
            },
        ],
    };
}
