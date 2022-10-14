import { BABEL_PARSER_OPTIONS } from "./paserOptions";
import { parse as babelParse } from "@babel/parser";

export function parse(code) {
  const ast = babelParse(code, BABEL_PARSER_OPTIONS);
  return ast;
}
