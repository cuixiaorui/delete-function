import * as vscode from "vscode";
import { getDeleteFunctionNode } from "./deleteFunction";

export function activate(context: vscode.ExtensionContext) {
  const commandId = "delete-function.deleteFunction";
  let disposable = vscode.commands.registerCommand(commandId, deleteFunction);

  context.subscriptions.push(disposable);
}

function deleteFunction() {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    let curPos = editor.selection.active;
    let offset = editor.document.offsetAt(curPos);

    const node = getDeleteFunctionNode(offset, editor.document.getText());
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
