import * as vscode from "vscode";
import { getDeleteFunctionNode } from "./handlers";

export function activate(context: vscode.ExtensionContext) {
  const commandId = "delete-function.deleteFunction";
  const disposable = vscode.commands.registerCommand(commandId, () => {
    try {
      deleteFunction();
    } catch (e) { }
  });

  context.subscriptions.push(disposable);
}

function deleteFunction() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    let curPos = editor.selection.active;
    let offset = editor.document.offsetAt(curPos);
    const languageType = vscode.window.activeTextEditor?.document.languageId;

    if (!languageType) {
      return;
    }
    const node = getDeleteFunctionNode(
      offset,
      editor.document.getText(),
      languageType
    );

    if (!node) {
      return;
    }

    editor.edit((editBuilder) => {
      editBuilder.delete(
        new vscode.Range(
          new vscode.Position(node.start.line - 1, node.start.column),
          new vscode.Position(node.end.line - 1, node.end.column)
        )
      );
    });
  }
}