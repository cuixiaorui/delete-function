// ExportNamedDeclaration and ExportDefaultDeclaration
import { BaseNodeHandler } from "./BaseNodeHandler";
export class ExportDeclarationHandler extends BaseNodeHandler {
  isContain(): Boolean {
    return this._isContain(this.path.parentPath.node, this.index);
  }

  handle() {
    return {
      name: (this.path as any).parentPath.isExportDefaultDeclaration()
        ? ""
        : (this.path as any).parentPath.node.declaration.id.name,
      start: { ...(this.path as any).parentPath.node.loc.start },
      end: { ...(this.path as any).parentPath.node.loc.end },
    };
  }
}
