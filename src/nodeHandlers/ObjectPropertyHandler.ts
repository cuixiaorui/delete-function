import { BaseNodeHandler } from "./BaseNodeHandler";
export class ObjectPropertyHandler extends BaseNodeHandler {
  isContain(): Boolean {
    return this._isContain(this.path.parentPath.node, this.index);
  }
  handle() {
    return {
      name: this.path.parentPath.node.key.name,
      start: { ...this.path.parentPath.node.loc.start },
      end: { ...this.path.parentPath.node.loc.end },
    };
  }
}
