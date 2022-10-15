import traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import {
  FunctionDeclaration,
  ClassMethod,
  Identifier,
  ExportNamedDeclaration,
} from "@babel/types";
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
    ClassMethod: handleClassMethod,
  });

  function handleFunctionDeclaration(path: NodePath<FunctionDeclaration>) {
    if (isContain(path.node, index)) {
      node = createNodeWithFunctionDeclaration(path.node);
    }
  }

  function hanldeFunctionExpression(path) {
    if (
      path.parentPath.node.type === "VariableDeclarator" &&
      path.parentPath.parentPath.node.type === "VariableDeclaration"
    ) {
      if (isContain(path.parentPath.parentPath.node, index)) {
        node = createNodeWithVariableDeclarator(
          path.parentPath.parentPath.node,
          path.parentPath.node
        );
      }
    }
  }

  function handleClassMethod(path) {
    node = createNodeWithClassMethod(path.node);
  }

  return node;
}

function createNodeWithClassMethod(node: ClassMethod) {
  return {
    name: (node.key as Identifier).name,
    start: { ...node.loc!.start },
    end: { ...node.loc!.end },
  };
}

function isContain(node, index: number) {
  return index >= node.start && index <= node.end;
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

function createNodeWithExportNamedDeclaration(node: any): Node {
  return {
    name: node.declaration.id.name,
    start: { ...node.loc.start },
    end: { ...node.loc.end },
  };
}

function createNodeWithFunctionDeclaration(functionDeclarationNode): Node {
  return {
    name: functionDeclarationNode.id.loc.identifierName,
    start: { ...functionDeclarationNode.loc.start },
    end: { ...functionDeclarationNode.loc.end },
  };
}


