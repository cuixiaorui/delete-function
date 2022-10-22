import { ClassMethodsHandler } from "./ClassMethodsHandler";
import { ExportDeclarationHandler } from "./ExportDeclarationHandler";
import { ExportDefaultDeclarationHandler } from "./ExportDefaultDeclarationHandler";
import { ExportNamedDeclarationHandler } from "./ExportNamedDeclarationHandler";
import { FunctionDeclarationHandler } from "./FunctionDeclarationHandler";
import { FunctionExpressionHandler } from "./FunctionExpressionHandler";
import { ObjectMethodHandler } from "./ObjectMethdHandler";
import { ObjectPropertyHandler } from "./ObjectPropertyHandler";
export function createNodeFunctionExpressionHandler(path, index) {
  if (path.parentPath?.isExportDefaultDeclaration()) {
    return new ExportDefaultDeclarationHandler(path, index);
  } else if (
    path.parentPath?.parentPath?.parentPath?.isExportNamedDeclaration()
  ) {
    return new ExportNamedDeclarationHandler(path, index);
  } else if (path.parentPath?.isObjectProperty()) {
    return new ObjectPropertyHandler(path, index);
  } else if (
    path.parentPath?.node.type === "VariableDeclarator" &&
    path.parentPath?.parentPath?.node.type === "VariableDeclaration"
  ) {
    return new FunctionExpressionHandler(path, index);
  }
}

export function createNodeFunctionDeclarationHandler(path, index) {
  if (
    path.parentPath.isExportNamedDeclaration() ||
    path.parentPath.isExportDefaultDeclaration()
  ) {
    return new ExportDeclarationHandler(path, index);
  } else if (path.isFunctionDeclaration()) {
    return new FunctionDeclarationHandler(path, index);
  }
}

export function handlerNodeClassMethod(path, index) {
  const nodeHandler = new ClassMethodsHandler(path, index);
  return nodeHandler?.handle();
}

export function handleNodeObjectMethod(path, index) {
  // const nodeHandler = new ObjectMethodHandler(path, index);
  // if (nodeHandler.isContain()) {
  //   return nodeHandler.handle();
  // }
  return new ObjectMethodHandler(path, index);
}

export function createNodeObjectMethodHandler(path, index) {
  // const nodeHandler = new ObjectMethodHandler(path, index);
  // if (nodeHandler.isContain()) {
  //   return nodeHandler.handle();
  // }
  return new ObjectMethodHandler(path, index);
}
