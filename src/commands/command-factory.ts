import * as vscode from "vscode";

type CommandName = "addWorkspace";

export default class CommandFactory {
  constructor(private readonly context: vscode.ExtensionContext) {}

  public registerCommand(commandName: CommandName, command: () => void) {
    const disposable = vscode.commands.registerCommand(`vscode-harpoon.${commandName}`, command);
    this.context.subscriptions.push(disposable);
  }
}
