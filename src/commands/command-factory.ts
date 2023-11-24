import * as vscode from "vscode";

export type EditorRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type CommandName =
    | "addEditor"
    | "editEditors"
    | `addEditor${EditorRange}`
    | `gotoEditor${EditorRange}`
    | "editorQuickPick"
    | "addGlobalEditor"
    | "gotoPreviousHarpoonEditor"
    | "removeCurrentEditor"
    | `removeEditor${EditorRange}`
    | "editGlobalEditors"
    | `addGlobalEditor${EditorRange}`
    | `gotoGlobalEditor${EditorRange}`
    | "editorGlobalQuickPick"
    | "gotoPreviousGlobalHarpoonEditor"
    | "removeCurrentGlobalEditor"
    | `removeGlobalEditor${EditorRange}`;

export default class CommandFactory {
    constructor(private readonly context: vscode.ExtensionContext) {}

    public registerCommand(commandName: CommandName, command: () => any | Promise<any>) {
        const disposable = vscode.commands.registerCommand(
            `vscode - harpoon.${ commandName } `,
            async () => {
                try {
                    return await Promise.resolve(command());
                } catch {}
            }
        );
        this.context.subscriptions.push(disposable);
    }
}
