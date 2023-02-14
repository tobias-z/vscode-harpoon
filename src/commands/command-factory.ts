import * as vscode from "vscode";

type CommandName =
    | "addEditor"
    | "editEditors"
    | "addEditor1"
    | "addEditor2"
    | "addEditor3"
    | "addEditor4"
    | "addEditor5"
    | "addEditor6"
    | "addEditor7"
    | "addEditor8"
    | "addEditor9"
    | "gotoEditor1"
    | "gotoEditor2"
    | "gotoEditor3"
    | "gotoEditor4"
    | "gotoEditor5"
    | "gotoEditor6"
    | "gotoEditor7"
    | "gotoEditor8"
    | "gotoEditor9"
    | "editorQuickPick"
    | "addGlobalEditor"
    | "editGlobalEditors"
    | "addGlobalEditor1"
    | "addGlobalEditor2"
    | "addGlobalEditor3"
    | "addGlobalEditor4"
    | "addGlobalEditor5"
    | "addGlobalEditor6"
    | "addGlobalEditor7"
    | "addGlobalEditor8"
    | "addGlobalEditor9"
    | "gotoGlobalEditor1"
    | "gotoGlobalEditor2"
    | "gotoGlobalEditor3"
    | "gotoGlobalEditor4"
    | "gotoGlobalEditor5"
    | "gotoGlobalEditor6"
    | "gotoGlobalEditor7"
    | "gotoGlobalEditor8"
    | "gotoGlobalEditor9"
    | "editorGlobalQuickPick";

export default class CommandFactory {
    constructor(private readonly context: vscode.ExtensionContext) {}

    public registerCommand(commandName: CommandName, command: () => any | Promise<any>) {
        const disposable = vscode.commands.registerCommand(
            `vscode-harpoon.${commandName}`,
            async () => {
                try {
                    return await Promise.resolve(command());
                } catch {}
            }
        );
        this.context.subscriptions.push(disposable);
    }
}
