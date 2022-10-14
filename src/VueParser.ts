import { parse, compileScript } from "@vue/compiler-sfc";
import { getDeleteFunctionNode } from "./deleteFunction";
export class VuePareser {
  getDeleteFunctionNode(index: number, code: string) {
    const { descriptor } = parse(code);

    if (!descriptor.scriptSetup && !descriptor.script) {
      return null;
    }

    const sfcNode = descriptor.scriptSetup
      ? descriptor.scriptSetup.loc
      : descriptor.script!.loc;

    const { loc } = compileScript(descriptor, {
      id: "delete-function",
    });

    const functionNode = getDeleteFunctionNode(
      index - loc.start.offset,
      loc.source
    );

    if (sfcNode && functionNode) {
      const node = {
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

      return node;
    }
  }
}
