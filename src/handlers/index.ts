import { getDeleteFunctionNodeJs } from "./handleJs";
import { getDeleteFunctionNodeVue } from "./handleVue";

export function getDeleteFunctionNode(index: number, code: string, type: string) {
  if (type === "vue") {
    return getDeleteFunctionNodeVue(index, code);
  } else {
    return getDeleteFunctionNodeJs(index, code);
  }
}
