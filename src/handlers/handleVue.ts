import { parse, compileScript } from "@vue/compiler-sfc";
import { getDeleteFunctionNodeJs } from "./handleJs";
export function getDeleteFunctionNodeVue(index: number, code: string) {
  const { descriptor } = parse(code);

  if (!descriptor.scriptSetup && !descriptor.script) {
    // no write scriptSetup and  no write script
    return null;
  }

  const sfcNode = descriptor.scriptSetup
    ? descriptor.scriptSetup.loc
    : descriptor.script!.loc;

  const { loc } = compileScript(descriptor, {
    id: "delete-function",
  });

  const functionNode = getDeleteFunctionNodeJs(
    index - loc.start.offset,
    loc.source
  );

  if (!functionNode) {
    // not found node by index
    return;
  }

  return {
    name: functionNode.name,
    start: {
      line: sfcNode.start.line + (functionNode.start.line - 1),
      column: functionNode.start.column,
    },
    end: {
      line: sfcNode.start.line + (functionNode.end.line - 1),
      column: functionNode.end.column,
    },
  };
}
