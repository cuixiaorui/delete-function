import { BaseNodeHandler } from "./BaseNodeHandler";
export class ExportNamedDeclarationHandler extends BaseNodeHandler {
  isContain(): boolean {
    return this._isContain(
      this.path.parentPath.parentPath.parentPath.node,
      this.index
    );
  }

  handle() {
    const getName = () => {
      return Object.keys(this.path.parentPath.getBindingIdentifiers())[0];
    };

    return {
      name: getName(),
      start: { ...this.path.parentPath.parentPath.parentPath.node.loc.start },
      end: { ...this.path.parentPath.parentPath.parentPath.node.loc.end },
    };
  }
}
