import { ParserOptions } from "@babel/parser";

export const BABEL_PARSER_OPTIONS: ParserOptions = {
  sourceType: "module",
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  startLine: 1,

  // Tokens are necessary for Recast to do its magic ✨
  tokens: true,

  plugins: [
    "asyncGenerators",
    "bigInt",
    "classPrivateMethods",
    "classPrivateProperties",
    "classProperties",
    // Not compatible with "decorators-legacy"
    // "decorators",
    "decorators-legacy",
    "doExpressions",
    "dynamicImport",
    // Make tests fail, not sure why
    // "estree",
    "exportDefaultFrom",
    "exportNamespaceFrom",
    // Not compatible with "typescript"
    // "flow",
    // "flowComments",
    "functionBind",
    "functionSent",
    "importMeta",
    "jsx",
    "logicalAssignment",
    "nullishCoalescingOperator",
    "numericSeparator",
    "objectRestSpread",
    "optionalCatchBinding",
    "optionalChaining",
    "partialApplication",
    ["pipelineOperator", { proposal: "minimal" }],
    "placeholders",
    "throwExpressions",
    "topLevelAwait",
    "typescript",
  ],
};
