import { BaseNodeHandler } from './BaseNodeHandler';

export class ClassMethodsHandler extends BaseNodeHandler{
  handle () {
    return {
      name: (this.path.node.key).name,
      start: { ...this.path.node.loc!.start },
      end: { ...this.path.node.loc!.end },
    };
  }
}
