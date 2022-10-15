import { describe, it, expect, test } from "vitest";
import { getDeleteFunctionNodeJs } from "../handlers/handleJs";

describe("FunctionDeclaration", () => {
  it("should delete function at index Position", () => {
    // getName
    let index = 29;

    const code = `
    const name = "cxr";
    function getName () {
        return 'name'
    }
    function setName(newName){
      name = newName
    }
    `;

    const node = getDeleteFunctionNodeJs(index, code);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 3,
        column: 4,
        index: 29,
      },
      end: {
        line: 5,
        column: 5,
        index: 78,
      },
    });

    // update index
    // setName
    index = 83;

    const updatedNode = getDeleteFunctionNodeJs(index, code);

    expect(updatedNode).toEqual({
      name: "setName",
      start: {
        line: 6,
        column: 4,
        index: 83,
      },
      end: {
        line: 8,
        column: 5,
        index: 136,
      },
    });
  });

  it.todo("export function", () => {
    let index = 37;

    const code = `
    const name = "cxr";
    export function getName () {
        return 'name'
    }
    `;

    const node = getDeleteFunctionNodeJs(index, code);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 3,
        column: 4,
        index: 29,
      },
      end: {
        line: 5,
        column: 5,
        index: 85,
      },
    });
  });



  it.todo("export default function", () => {
    let index = 37;

    const code = `
    const name = "cxr";
    export default function getName () {
        return 'name'
    }
    `;

    const node = getDeleteFunctionNodeJs(index, code);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 3,
        column: 4,
        index: 29,
      },
      end: {
        line: 5,
        column: 5,
        index: 93,
      },
    });
  });

  describe("nested function", () => {
    it("should delete outside function", () => {
      const index = 38;

      const code = `
    const name = "cxr";
    function getName () {
      function heihei(){
        return "heihei"
      }
    }
    `;

      const node = getDeleteFunctionNodeJs(index, code);

      expect(node).toEqual({
        name: "getName",
        start: {
          line: 3,
          column: 4,
          index: 29,
        },
        end: {
          line: 7,
          column: 5,
          index: 113,
        },
      });
    });
    it("should delete inside function", () => {
      // 定位到 heihei 的位置
      const index = 57;

      const code = `
    const name = "cxr";
    function getName () {
      function heihei(){
        return "heihei"
      }
    }
    `;

      const node = getDeleteFunctionNodeJs(index, code);

      expect(node).toEqual({
        name: "heihei",
        start: {
          line: 4,
          column: 6,
          index: 57,
        },
        end: {
          line: 6,
          column: 7,
          index: 107,
        },
      });
    });
  });
});

describe("FunctionExpression", () => {
  it("should delete function at index Position", () => {
    // getName function
    let index = 45;

    const code = `
    const name = "cxr";
    const getName = function () {
        return 'name'
    }
    const setName = function (){
      return 'name'
    }
    `;

    const node = getDeleteFunctionNodeJs(index, code);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 3,
        column: 4,
        index: 29,
      },
      end: {
        line: 5,
        column: 5,
        index: 86,
      },
    });

    // update index
    // setName
    index = 91;
    const updatedNode = getDeleteFunctionNodeJs(index, code);

    expect(updatedNode).toEqual({
      name: "setName",
      start: {
        line: 6,
        column: 4,
        index: 91,
      },
      end: {
        line: 8,
        column: 5,
        index: 145,
      },
    });
  });

  describe("nested function", () => {
    it("should delete outside function", () => {
      // getName function
      const index = 29;

      const code = `
    const name = "cxr";
    const getName = function () {
        return 'name'

        const setName = function (){
          console.log("setName")
        }
    }
    `;

      const node = getDeleteFunctionNodeJs(index, code);

      expect(node).toEqual({
        name: "getName",
        start: {
          line: 3,
          column: 4,
          index: 29,
        },
        end: {
          line: 9,
          column: 5,
          index: 167,
        },
      });
    });

    it("should delete inside function", () => {
      // setName function
      const index = 90;

      const code = `
    const name = "cxr";
    const getName = function () {
        return 'name'

        const setName = function (){
          console.log("setName")
        }
    }
    `;

      const node = getDeleteFunctionNodeJs(index, code);

      expect(node).toEqual({
        name: "setName",
        start: {
          line: 6,
          column: 8,
          index: 90,
        },
        end: {
          line: 8,
          column: 9,
          index: 161,
        },
      });
    });
  });
});

describe("ArrowFunctionExpression", () => {
  it("should delete function at index Position", () => {
    // getName
    let index = 29;

    const code = `
    const name = "cxr";
    const getName = ()=> "cxr";
    const setName = ()=> "cxr";
    `;

    // 应该返回的是 getName
    const node = getDeleteFunctionNodeJs(index, code);

    expect(node).toEqual({
      name: "getName",
      start: {
        line: 3,
        column: 4,
        index: 29,
      },
      end: {
        line: 3,
        column: 31,
        index: 56,
      },
    });

    // update index
    // setName
    index = 61;

    const updatedNode = getDeleteFunctionNodeJs(index, code);

    expect(updatedNode).toEqual({
      name: "setName",
      start: {
        line: 4,
        column: 4,
        index: 61,
      },
      end: {
        line: 4,
        column: 31,
        index: 88,
      },
    });
  });

  describe("nested function", () => {
    it("should delete outside function", () => {
      // getName function
      const index = 29;

      const code = `
    const name = "cxr";
    const getName = ()=> {
      console.log("heihei");
      const setName = ()=> "hei"
    };
    `;

      const node = getDeleteFunctionNodeJs(index, code);

      expect(node).toEqual({
        name: "getName",
        start: {
          line: 3,
          column: 4,
          index: 29,
        },
        end: {
          line: 6,
          column: 6,
          index: 120,
        },
      });
    });

    it("should delete inside function", () => {
      // setName function
      const index = 87;

      const code = `
    const name = "cxr";
    const getName = ()=> {
      console.log("heihei");
      const setName = ()=> "hei"
    };
    `;

      const node = getDeleteFunctionNodeJs(index, code);

      expect(node).toEqual({
        name: "setName",
        start: {
          line: 5,
          column: 6,
          index: 87,
        },
        end: {
          line: 5,
          column: 32,
          index: 113,
        },
      });
    });
  });
});

test("Class Method", () => {
  const index = 20;
  const code = `
  class Dog{
    getName(){
      return "name"
    }
  }
  `;

  const node = getDeleteFunctionNodeJs(index, code);
  expect(node).toEqual({
    name: "getName",
    start: {
      column: 4,
      index: 18,
      line: 3,
    },
    end: {
      column: 5,
      index: 54,
      line: 5,
    },
  });
});
