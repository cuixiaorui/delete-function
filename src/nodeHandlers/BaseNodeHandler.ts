interface Node {
  name: string;
  start: {
    line: number;
    column: number;
    index: number;
  };
  end: {
    line: number;
    column: number;
    index: number;
  };
}

interface IBaseNodeHandler {
  handle(): Node | undefined;
  isContain(): Boolean;
}

export class BaseNodeHandler implements IBaseNodeHandler {
  protected path: any;
  protected index: any;
  constructor(path, index) {
    this.path = path;
    this.index = index;
  }

  _isContain(node, index) {
    // 也可以通过 工具类实现
    return index >= node.start && index <= node.end;
  }

  isContain(): Boolean {
    throw new Error("must write isContain");
  }

  handle(): Node | undefined {
    throw new Error("must write handle");
  }
}
