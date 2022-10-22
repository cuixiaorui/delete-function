import { BaseNodeHandler } from "./BaseNodeHandler";
export class FunctionDeclarationHandler extends BaseNodeHandler {
  isContain(): Boolean {
    return this._isContain(this.path.node, this.index);
  }

  handle() {
    return {
      name: this.path.node.id.loc.identifierName,
      start: { ...this.path.node.loc.start },
      end: { ...this.path.node.loc.end },
    };
  }
}
