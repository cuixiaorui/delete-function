import traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import { FunctionDeclaration } from "@babel/types";
import { parse } from "../parse";

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
 * return function node by point on documentText
 */
export function getDeleteFunctionNodeJs(
  point: number,
  documentText: string
): Node | undefined {
  let node;

  const ast = parse(documentText);

  traverse(ast, {
    FunctionDeclaration: handleFunctionDeclaration,
    FunctionExpression: hanldeFunctionExpression,
    ArrowFunctionExpression: hanldeFunctionExpression,
  });

  function handleFunctionDeclaration(path: NodePath<FunctionDeclaration>) {
    if (isContainPoint(path.node, point)) {
      node = createNodeWithFunctionDeclaration(path.node);
    }
  }

  function hanldeFunctionExpression(path) {
    if (
      path.parentPath.node.type === "VariableDeclarator" &&
      path.parentPath.parentPath.node.type === "VariableDeclaration"
    ) {
      if (isContainPoint(path.parentPath.parentPath.node, point)) {
        node = createNodeWithVariableDeclarator(
          path.parentPath.parentPath.node,
          path.parentPath.node
        );
      }
    }
  }

  return node;
}


function isContainPoint(node, point: number) {
  return point >= node.start && point <= node.end;
}

function createNodeWithVariableDeclarator(
  variableDeclaratorNode,
  parentNode
): Node {
  return {
    name: parentNode.id.name,
    start: { ...variableDeclaratorNode.loc.start },
    end: { ...variableDeclaratorNode.loc.end },
  };
}

function createNodeWithFunctionDeclaration(functionDeclarationNode): Node {
  return {
    name: functionDeclarationNode.id.loc.identifierName,
    start: { ...functionDeclarationNode.loc.start },
    end: { ...functionDeclarationNode.loc.end },
  };
}
