import traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import { FunctionDeclaration } from "@babel/types";
import { parse } from "../parse";
import {
  createNodeFunctionDeclarationHandler,
  createNodeFunctionExpressionHandler,
  createNodeObjectMethodHandler,
  createNodeClassMethodHandler
} from "../nodeHandlers";

interface Node {
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

/**
 * return function node by index on documentText
 */
export function getDeleteFunctionNodeJs(
  index: number,
  code: string
): Node | undefined {
  let node;

  const ast = parse(code);

  traverse(ast, {
    FunctionDeclaration: handleFunctionDeclaration,
    FunctionExpression: hanldeFunctionExpression,
    ArrowFunctionExpression: hanldeFunctionExpression,
    ClassMethod: (path) => {
      const nodeHandler = createNodeClassMethodHandler(path, index);
      if (nodeHandler?.isContain()) {
        node = nodeHandler?.handle();
      }
    },
    ObjectMethod: (path) => {
      const nodeHandler = createNodeObjectMethodHandler(path, index);
      if (nodeHandler?.isContain()) {
        node = nodeHandler?.handle();
      }
    },
  });

  function handleFunctionDeclaration(path: NodePath<FunctionDeclaration>) {
    const nodeHandler = createNodeFunctionDeclarationHandler(path, index);
    if (nodeHandler?.isContain()) {
      node = nodeHandler?.handle();
    }
  }

  function hanldeFunctionExpression(path) {
    const nodeHandler = createNodeFunctionExpressionHandler(path, index);
    if (nodeHandler?.isContain()) {
      node = nodeHandler?.handle();
    }
  }

  return node;
}