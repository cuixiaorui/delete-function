import { BaseNodeHandler } from "./BaseNodeHandler";
export class FunctionExpressionHandler extends BaseNodeHandler {
  isContain(): Boolean {
    return this._isContain(this.path.parentPath.parentPath.node, this.index);
  }
  handle() {
    return {
      name: this.path.parentPath.node.id.name,
      start: { ...this.path.parentPath.parentPath.node.loc.start },
      end: { ...this.path.parentPath.parentPath.node.loc.end },
    };
  }
}
