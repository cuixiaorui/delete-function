import traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import { FunctionDeclaration, ClassMethod, Identifier } from "@babel/types";
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
    ObjectMethod: handleObjectMethod,
  });

  function handleFunctionDeclaration(path: NodePath<FunctionDeclaration>) {
    if (
      path.parentPath.isExportNamedDeclaration() ||
      path.parentPath.isExportDefaultDeclaration()
    ) {
      handleExportDeclaration();
    } else {
      if (isContain(path.node, index)) {
        node = createNodeWithFunctionDeclaration(path.node);
      }
    }

    function handleExportDeclaration() {
      if (isContain(path.parentPath.node, index)) {
        node = {
          name: (path as any).parentPath.isExportDefaultDeclaration()
            ? ""
            : (path as any).parentPath.node.declaration.id.name,
          start: { ...(path as any).parentPath.node.loc.start },
          end: { ...(path as any).parentPath.node.loc.end },
        };
      }
    }
  }

  function hanldeFunctionExpression(path) {
    if (path.parentPath.isExportDefaultDeclaration()) {
      handleExportDefaultDeclaration();
    } else if (
      path.parentPath.parentPath.parentPath.isExportNamedDeclaration()
    ) {
      handleExportNamedDeclaration();
    } else if (path.parentPath.isObjectProperty()) {
      if (isContain(path.parentPath.node, index)) {
        node = {
          name: path.parentPath.node.key.name,
          start: { ...path.parentPath.node.loc.start },
          end: { ...path.parentPath.node.loc.end },
        };
      }
    } else {
      if (
        path.parentPath.node.type === "VariableDeclarator" &&
        path.parentPath.parentPath.node.type === "VariableDeclaration"
      ) {
        handleNormal();
      }
    }

    function handleExportDefaultDeclaration() {
      if (isContain(path.parentPath.node, index)) {
        node = {
          name: "",
          start: { ...path.parentPath.node.loc.start },
          end: { ...path.parentPath.node.loc.end },
        };
      }
    }

    function handleExportNamedDeclaration() {
      if (isContain(path.parentPath.parentPath.parentPath.node, index)) {
        function getName() {
          return Object.keys(path.parentPath.getBindingIdentifiers())[0];
        }

        node = {
          name: getName(),
          start: { ...path.parentPath.parentPath.parentPath.node.loc.start },
          end: { ...path.parentPath.parentPath.parentPath.node.loc.end },
        };
      }
    }

    function handleNormal() {
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

  function handleObjectMethod(path) {
    if (isContain(path.node, index)) {
      node = {
        name: path.node.key.name,
        start: { ...path.node.loc.start },
        end: { ...path.node.loc.end },
      };
    }
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

function createNodeWithFunctionDeclaration(functionDeclarationNode): Node {
  return {
    name: functionDeclarationNode.id.loc.identifierName,
    start: { ...functionDeclarationNode.loc.start },
    end: { ...functionDeclarationNode.loc.end },
  };
}
