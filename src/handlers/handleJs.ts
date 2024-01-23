import type { NodePath } from "@babel/traverse";
import traverse from "@babel/traverse";
import { FunctionDeclaration } from "@babel/types";
import {
  createNodeClassMethodHandler,
  createNodeFunctionDeclarationHandler,
  createNodeFunctionExpressionHandler,
  createNodeObjectMethodHandler
} from "../nodeHandlers";
import { parse } from "../parse";
import { Node } from './index';

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