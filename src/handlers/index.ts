import * as vscode from 'vscode';
import { getDeleteFunctionNodeJs } from "./handleJs";
import { getDeleteFunctionNodeRust } from "./handleRs";
import { getDeleteFunctionNodeVue } from "./handleVue";

export interface Node {
  name: string;
  start: {
    line: number;
    column: number;
    index: number;
  };
  end: {
    line: number;
    column: number;
    index: number;
  };
}

export function getDeleteFunctionNode(index: number, code: string, type: string) {
  if (type === "vue") {
    return getDeleteFunctionNodeVue(index, code);
  } if (type === "rust") {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }
    let curPos = editor.selection.active;

    return getDeleteFunctionNodeRust(code, curPos.line);
  } else {
    return getDeleteFunctionNodeJs(index, code);
  }
}
