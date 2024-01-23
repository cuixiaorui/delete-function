import { rust2ast } from "pkg/delete_function_vsc";
import { Node } from './index';

export function getDeleteFunctionNodeRust(code: string, focusLine: number) {
  const astStr = rust2ast(code, focusLine + 1);
  if (!astStr) { return; }
  const ast = JSON.parse(astStr) as Node;

  return {
    name: ast.name,
    start: {
      line: ast.start.line,
      column: ast.start.column
    },
    end: {
      line: ast.end.line,
      column: ast.end.column
    },
  };
}