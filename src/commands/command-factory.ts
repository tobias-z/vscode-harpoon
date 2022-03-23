import * as vscode from "vscode";

type CommandName =
  | "addEditor"
  | "editEditors"
  | "gotoEditor1"
  | "gotoEditor2"
  | "gotoEditor3"
  | "gotoEditor4"
  | "gotoEditor5"
  | "gotoEditor6"
  | "gotoEditor7"
  | "gotoEditor8"
  | "gotoEditor9"
  | "addGlobalEditor"
  | "editGlobalEditors"
  | "gotoGlobalEditor1"
  | "gotoGlobalEditor2"
  | "gotoGlobalEditor3"
  | "gotoGlobalEditor4"
  | "gotoGlobalEditor5"
  | "gotoGlobalEditor6"
  | "gotoGlobalEditor7"
  | "gotoGlobalEditor8"
  | "gotoGlobalEditor9";

export default class CommandFactory {
  constructor(private readonly context: vscode.ExtensionContext) {}

  public registerCommand(commandName: CommandName, command: () => void) {
    const disposable = vscode.commands.registerCommand(`vscode-harpoon.${commandName}`, command);
    this.context.subscriptions.push(disposable);
  }
}
