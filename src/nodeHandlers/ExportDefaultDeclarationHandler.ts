import { BaseNodeHandler } from "./BaseNodeHandler";
export class ExportDefaultDeclarationHandler extends BaseNodeHandler {
  isContain(): Boolean {
    return this._isContain(this.path.parentPath.node, this.index);
  }

  handle() {
    return {
      name: "",
      start: { ...this.path.parentPath.node.loc.start },
      end: { ...this.path.parentPath.node.loc.end },
    };
  }
}
